# 설치

1. [nvm](https://github.com/creationix/nvm) 혹은 [nvm-windows](https://github.com/coreybutler/nvm-windows)를 이용해 Node.js v8 버전 설치
1. 터미널에서 `git clone git@github.com:snume-webdev/snume-webzine.git` 실행
1. `snume-webzine` 폴더로 이동 후 `npm install`

# 실행 및 글 작성

- 초안을 작성하려면 터미널에서 `npm run draft` 실행 후 `source/_drafts` 폴더에 글을 작성
- 초안이 작성되었으면 해당 파일을 `source/_posts` 폴더로 이동
- 초안을 제외한 웹사이트를 보고 싶으면 `npm run server` 명령 실행

# 배포

`npm run deploy` 명령 실행 (저장소 푸시 권한 필요)
