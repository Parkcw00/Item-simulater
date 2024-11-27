<h1>아이템 시뮬레이터 과제</h1>

<h2>프로젝트 개요<h2>
<p>"Node.js와 Express.js를 활용한 나만의 게임 아이템 시뮬레이터 서비스 만들기"</p>

<h3>1. 웹 프레임워크</h3>
<p>Node.js의 대표적인 웹 프레임워크인 <strong>Express</strong>를 이용합니다.</p>

<h3>2. 패키지 매니저</h3>
<p><strong>npm</strong> 또는 <strong>yarn</strong> 중 편한 것을 이용합니다.</p>
<p>🚨 <strong>주의사항</strong> - 둘 중 어떤 것을 사용해도 좋지만, 혼용해서 사용하면 안됩니다. - <code>package-lock.json</code>, <code>yarn.lock</code>이 동시에 있으면 안됩니다. (의도와 다른 동작을 일으킬 수 있습니다.)</p>

<h3>3. 모듈 시스템</h3>
<p>기본 모듈 시스템(<strong>CommonJS, type: "commonjs"</strong>) 또는 ES6 부터 도입된 모듈 시스템(<strong>ESModule, type: "module"</strong>)을 이용합니다.</p>
<p>🚨 <strong>주의사항</strong> - 둘 중 어떤 것을 사용해도 좋지만, 혼용해서 사용하면 안됩니다. - <code>require/exports</code>와 <code>import/export</code>가 동시에 있으면 안됩니다.</p>

<h3>4. 데이터베이스</h3>
<p>숙련 주차 강의 후반에서 다룬 <strong>MySQL</strong>을 사용합니다.</p>
<p>직접 설치하지 않고, Cloud 서비스인 <strong>AWS RDS</strong>를 이용합니다.</p>

<h3>5. ORM(Object Relational Mapping)</h3>
<p><strong>MySQL</strong>의 데이터를 쉽게 읽고 쓰게 해주는 <a href="https://www.prisma.io/">Prisma</a>를 사용합니다.</p>

<p>--------------------------------------------------------<p>

<p>***깃허브 규칙***<p>
<table style="font-size: 12px;">
  <tr>
    <th>작업 타입</th>
    <th>작업내용</th>
  </tr>
  <tr>
    <td>✨ update</td>
    <td>해당 파일에 새로운 기능이 생김</td>
  </tr>
  <tr>
    <td>🎉 add</td>
    <td>없던 파일을 생성함, 초기 세팅</td>
  </tr>
  <tr>
    <td>🐛 bugfix</td>
    <td>버그 수정</td>
  </tr>
  <tr>
    <td>♻️ refactor</td>
    <td>코드 리팩토링</td>
  </tr>
  <tr>
    <td>🩹 fix</td>
    <td>코드 수정</td>
  </tr>
  <tr>
    <td>🚚 move</td>
    <td>파일 옮김/정리</td>
  </tr>
  <tr>
    <td>🔥 del</td>
    <td>기능/파일을 삭제</td>
  </tr>
  <tr>
    <td>🍻 test</td>
    <td>테스트 코드를 작성</td>
  </tr>
  <tr>
    <td>💄 style</td>
    <td>css</td>
  </tr>
  <tr>
    <td>🙈 gitfix</td>
    <td>gitignore 수정</td>
  </tr>
  <tr>
    <td>🔨script</td>
    <td>package.json 변경(npm 설치 등)</td>
  </tr>
</table>

## 완료된 필수 기능

### 1. 프로젝트 관리

1. **`.env` 파일**을 이용하여 민감한 정보 (DB 계정 정보, API Key 등)를 안전하게 관리합니다.
2. **`.gitignore` 파일**을 생성하여 `.env` 파일과 `node_modules` 폴더가 GitHub에 올라가지 않도록 설정합니다.
3. **`.prettierrc` 파일**을 생성하여 일정한 코드 포맷팅을 유지할 수 있도록 설정합니다.

### 2. 데이터베이스 모델링 구현

1. **아이템 테이블**을 생성하여 다양한 아이템들이 모델을 활용하여 구현되게 되었습니다
2. **캐릭터 테이블**을 생성하여 캐릭터모델을 활용하여 하나의 계정이 다양한 캐릭터를 보유할 수 있습니다.
3. **계정 테이블**을 생성하여 이용자의 이메일과 아이디 및 비밀번호를 입력 받습니다.
