define(["postmonger"], function (Postmonger) {
    "use strict";
  
    var connection = new Postmonger.Session();
    var payload = {};
    var lastStepEnabled = false;
    var steps = [
      // initialize to the same value as what's set in config.json for consistency
      { label: "Step 1", key: "step1" },
      { label: "Step 2", key: "step2" },
      { label: "Step 3", key: "step3" },
      { label: "Step 4", key: "step4", active: false },
    ];
    var currentStep = steps[0].key;
  
    $(window).ready(onRender);
  
    connection.on("initActivity", initialize);
    connection.on("requestedTokens", onGetTokens);
    connection.on("requestedEndpoints", onGetEndpoints);
  
    connection.on("clickedNext", onClickedNext);
    connection.on("clickedBack", onClickedBack);
    connection.on("gotoStep", onGotoStep);
  
    function onRender() {
      // JB will respond the first time 'ready' is called with 'initActivity'
      connection.trigger("ready");
  
      connection.trigger("requestTokens");
      connection.trigger("requestEndpoints");

      // Disable the next button if a value isn't selected
      $("#select1").change(function () {
        var message = getMessage();
        connection.trigger("updateButton", {
          button: "next",
          enabled: Boolean(message),
        });

        $("#message").html(message);
      });
  
      // Toggle step 4 active/inactive
      // If inactive, wizard hides it and skips over it during navigation
      $("#toggleLastStep").click(function () {
        lastStepEnabled = !lastStepEnabled; // toggle status
        steps[3].active = !steps[3].active; // toggle active
  
        connection.trigger("updateSteps", steps);
      });
    }
  
    function initialize(data) {
      if (data) {
        payload = data;
      }
  
      var message;
      var hasInArguments = Boolean(
        payload["arguments"] &&
          payload["arguments"].execute &&
          payload["arguments"].execute.inArguments &&
          payload["arguments"].execute.inArguments.length > 0
      );
  
      var inArguments = hasInArguments
        ? payload["arguments"].execute.inArguments
        : {};
  
      $.each(inArguments, function (index, inArgument) {
        $.each(inArgument, function (key, val) {
          if (key === "message") {
            message = val;
          }
        });
      });
  
      // If there is no message selected, disable the next button
      if (!message) {
        showStep(null, 1);
        connection.trigger("updateButton", { button: "next", enabled: false });
        // If there is a message, skip to the summary step
      } else {
        $("#select1")
          .find("option[value=" + message + "]")
          .attr("selected", "selected");
        $("#message").html(message);
        showStep(null, 3);
      }
    }
  
    function onGetTokens(tokens) {
      // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
      // console.log(tokens);
    }
  
    function onGetEndpoints(endpoints) {
      // Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
      // console.log(endpoints);
    }
  
    function onClickedNext() {
      if (
        (currentStep.key === "step3" && steps[3].active === false) ||
        currentStep.key === "step4"
      ) {
        save();
      } else {
        connection.trigger("nextStep");
      }
    }
  
    function onClickedBack() {
      connection.trigger("prevStep");
    }
  
    function onGotoStep(step) {
      showStep(step);
      connection.trigger("ready");
    }
  
    function showStep(step, stepIndex) {
      if (stepIndex && !step) {
        step = steps[stepIndex - 1];
      }
  
      currentStep = step;
  
      $(".step").hide();
  
      switch (currentStep.key) {
        case "step1":
          $("#step1").show();
          connection.trigger("updateButton", {
            button: "next",
            enabled: Boolean(getMessage()),
          });
          connection.trigger("updateButton", {
            button: "back",
            visible: false,
          });
          break;
        case "step2":
          $("#step2").show();
          connection.trigger("updateButton", {
            button: "back",
            visible: true,
          });
          connection.trigger("updateButton", {
            button: "next",
            text: "next",
            visible: true,
          });
          break;
        case "step3":
          $("#step3").show();
          connection.trigger("updateButton", {
            button: "back",
            visible: true,
          });
          if (lastStepEnabled) {
            connection.trigger("updateButton", {
              button: "next",
              text: "next",
              visible: true,
            });
          } else {
            connection.trigger("updateButton", {
              button: "next",
              text: "done",
              visible: true,
            });
          }
          break;
        case "step4":
          $("#step4").show();
          break;
      }
    }

    //TEST 1
    function save() {
      console.log("Test - save() 진입");
      var name = $("#select1").find("option:selected").html();
      var value = getMessage();
      console.log("Test - value");
      console.log(value);

      // 'payload' is initialized on 'initActivity' above.
      // Journey Builder sends an initial payload with defaults
      // set by this activity's config.json file.  Any property
      // may be overridden as desired.
      payload.name = name;
    
      payload["arguments"].execute.inArguments = [{ message: value }];
    
      payload["metaData"].isConfigured = true;
    
      // 특정 조건을 확인하여 오류 메시지 설정
      if (!value) {
        // 메시지가 선택되지 않았을 때
        console.log("Test - if 1");
        payload["errors"] = ["메시지를 선택해야합니다."];
      } else {
        // 특정 조건에 따라 오류 메시지 설정
        if (value.length < 5) {
          console.log("Test - if 2");
          payload["errors"] = [{ "message": "오류 메시지 테스트" }];
        } else {
          // 오류가 없는 경우 오류 메시지를 제거
          console.log("Test - if 3");
          delete payload["errors"];
        }
      }
    
      connection.trigger("updateActivity", payload);
    }
    
  

    //원본
  //   function save() {
  //     var name = $("#select1").find("option:selected").html();
  //     var value = getMessage();
  
  //     // 'payload' is initialized on 'initActivity' above.
  //     // Journey Builder sends an initial payload with defaults
  //     // set by this activity's config.json file.  Any property
  //     // may be overridden as desired.
  //     payload.name = name;
  
  //     payload["arguments"].execute.inArguments = [{ message: value }];
  
  //     payload["metaData"].isConfigured = true;

  //     //Validate 테스트 부분 시작
  //     // payload.configurationArguments.validate = [{ body: "bodyTest" }]
  //     //Validate 테스트 부분 끝
  //     payload["errors"] = ["에러 메시지 테스트"]

  //     connection.trigger("updateActivity", payload);

  //   }
  
    function getMessage() {
      return $("#select1").find("option:selected").attr("value").trim();
    }

});