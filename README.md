## Git 기초 세팅

1. git을 사용할 폴더 생성

2. 해당 폴더에서 우클릭 후 git bash 실행 (git bash가 해당 폴더를 경로로 잡아서 실행됨)

3. 해당 경로에 git init


## 계정 설정

id/pw 자동 저장 설정
git config --global credential.helper store

user정보 등록 - git의 닉네임과 이메일
git config --global user.name "닉네임"
git config --global user.email "이메일"

user 정보 삭제
git config --unset --global user.name
git config --unset --global user.email


## Git 기본 명령어

### git 'remote'

git remote
로컬 저장소에 연결된 원격 저장소를 확인

git remote add [별칭] [원격 저장소 URL 주소]
로컬 저장소에 새로운 원격 저장소를 등록 / [별칭]은 주로 origin을 사용
    
git remote show [원격 저장소명]
원격 저장소의 세부 정보를 확인
    
git remote rm [원격 저장소명]
원격 저장소를 제거


### git 'add'

git add [파일명 혹은 디렉토리명]
Workspace의 파일을 스테이지 영역에 add / "*.txt"와 같이 여러 대상 지정 가능
    
git reset HEAD [파일명 혹은 디렉토리명]
해당 파일의 git add를 취소 / 파일명이 없으면 add된 파일 전체를 취소(unstaged 상태로 변경)


### git 'commit'

git commit -m "[커밋 메세지]"
커밋할 내용을 설명하는 메세지와 함께 add된 파일들을 commit
    
git commit --amend -m "[새로운 커밋 메세지]"
기존 커밋 메세지를 수정
    
git commit -a
add + commit / ex. git commit -am "The first commit"
    
git log
git commit한 목록 확인
    
git reset HEAD^
git commit 취소 후 해당 파일들을 unstaged 상태로 변경


### git 'push'

git push [원격 저장소명] [브랜치명]
로컬 저장소의 파일을 원격 저장소에 push / ex. git push origin master
    
git push -u  [원격 저장소명] [브랜치명]
git push --set-upstream  [원격 저장소명] [브랜치명]
원격 저장소와 브랜치를 기억하여 이후 'git push' 명령어로 단축하여 사용가능
    
git push --delete [브랜치명]
원격 저장소의 브랜치를 삭제


### git 'clone'

git clone [원격 저장소의 URL 주소]
원격 저장소의 파일을 workspace에 clone
    
git clone -b [브랜치명] [원격 저장소의 URL 주소]
특정 브랜치를 clone


### git 'pull'

git pull [원격 저장소명] [브랜치명]
원격 저장소의 변경이력을 workspace로 pull


참고 사이트 [Github 기초 사용법](https://velog.io/@jameskoo0503/Github-basics)