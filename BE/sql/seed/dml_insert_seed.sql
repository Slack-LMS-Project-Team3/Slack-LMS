INSERT INTO jungle_slam.`groups` (name,workspace_id) VALUES
     ('정글8기',1),
     ('307',1),
     ('Frontend',1),
     ('Backend',1);

INSERT INTO jungle_slam.group_members (group_id,user_id,user_name) VALUES
    (1, UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'), '이재웅'),
    (2, UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'), '이재웅'),
    (3, UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'), '이재웅'),
    (1, UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'), '안유진'),
    (2, UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'), '안유진'),
    (4, UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'), '안유진'),
    (1, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'), '김윤석'),
    (2, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'), '김윤석'),
    (4, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'), '김윤석'),
    (1, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'), '신명훈'),
    (2, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'), '신명훈'),
    (3, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'), '신명훈'),
    (1, UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'), '이찬석'),
    (2, UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'), '이찬석'),
    (4, UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'), '이찬석'),
    (1, UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), '박은채'),
    (2, UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), '박은채'),
    (3, UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), '박은채');

INSERT INTO jungle_slam.messages (tab_id,sender_id,content,is_updated,sender_name, created_at) VALUES
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '실력다지기 발표 자료 제출 안하신 분들이 아직 많습니다. 금일 발표 자료 제출 해 주세요', 0, '이동석코치님', '2024-07-04 17:42:56'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '안녕하십니까 정글러 여러분~ 다음주 월,화요일 코치 커피챗 신청을 원하시는 분들은 링크에 접속하신후 신청룰을 참고하여 기입 부탁드립니다.', 0, '이동석코치님', '2024-07-05 11:32:57'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://docs.google.com/spreadsheets/d/1TJwPk-ouY0S6WZm54-8CovGEOavEiZ6M/edit?gid=1806443967#gid=1806443967">링크</a></p> 로 접속 바랍니다.', 0, '이동석코치님', '2024-07-05 11:33:25'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '교육 현장 점검 종료 됐습니다.', 0, '유윤선코치님', '2024-07-06 18:26:13'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '307호는 301호의 발표가 늦어져서 지연될 예정이니 참고해주시면 감사하겠습니다. 다들 열심히 준비해주세요!', 0, '이동석코치님', '2024-07-07 22:17:09'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '금일 오후 일정 30분 연기 하겠습니다. 1시 30분 : 301, 306호 아이디어 발표 2시 30분 :  307호 아이디어 발표 ', 0, '이동석코치님', '2024-07-07 08:26:05'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '[긴급 공지] 누수 관련 점검 및 조치로 인해 지하 1층 식당 및 정글스테이지 방면 출입구를 일시적으로 폐쇄합니다\n     불편하시겠지만 다른 출입구를 이용하여 주시기 바랍니다.', 0, '유윤선코치님', '2024-07-08 19:58:33'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '크래프톤 Culture팀 구성원 과의 티타임 공지 합니다\n일시 : 08/01(금) 오전 11시 ~ 11시 50분\n장소 : 정글 캠퍼스 곳곳(최초 집결장소 : 캠퍼스 1층 라운지)\n참여 구성원 : HR 분야 다양한 경력을 지닌 現 크래프톤 Culture팀 소속 구성원\n참석인원 : 최대 10명\n진행방식 : 교육생 4~5명과 구성원 1명 매칭 후 가벼운 티타임 진행\n주제 : 조직문화와 회사 생활 등에 대해 자유로운 질의응답\n모집 기간 : ~ 08/01 (금)\n 조직문화, 일반적인 비즈니스 매너, 크래프톤의 문화 및 회사 생활 전반 등을 확인 해 볼 수 있는 좋은 기회입니다.', 0, '이동석코치님', '2024-07-09 16:12:26'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '안녕하십니까 정글러 여러분\n다음주 월,화요일 코치 커피챗 신청을 원하시는 분들은 링크 에 접속 후 신청룰을 참고하여 기입 부탁드립니다.', 0, '유윤선코치님', '2024-07-11 12:44:49'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '지난 4월에 진행한 1차 운동 이벤트(턱걸이 챌린지)에 이어, 교육생 여러분들의 의견을 수렴하여 2차 이벤트를 준비하였습니다\n다음과 같이 안내드리오니 많은 관심과 참여 바랍니다.\n\n\n\n🏀 농구 슛대결 참가 안내 🏀\n\n각 교육장의 명예를 건 치열한 슛 대결이 시작됩니다!', 0, '유윤선코치님', '2024-07-03 19:29:30'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '디스코드 초대링크입니다\n\n<a target="_blank" rel="noopener noreferrer nofollow" href= https://discord.gg/jqaYP7rP56>[성공적인 나만무를 위한 크래프톤 정글 3기 민상기님의 조언]</a>\n\n나만무 프로젝트를 들고 약 20여 곳의 면접을 본 경험을 바탕으로 제 의견을 공유합니다. 참고로 저는 주로 소규모 스타트업 위주로 면접에 참여한 점 참고 부탁드립니다.\n\n어투는 다소 확정적이지만, 매우 주관적인 의견임을 사전에 말씀드립니다.\n\n저와 다른 의견도 언제든지 환영합니다.🤗\n\n...\n\n- 난 백엔드 개발자 할거니까 React몰라도 되겠지? -> (소규모 스타트업 한정) 저는 첫 커리어를 Node 백엔드 개발자로 입사했지만 입사 후에는 파이썬 백엔드, C++ 라이브러리 개발, Vue, Flutter, Node를 모두 다뤄야 했습니다.', 0, '이동석코치님', '2024-07-09 16:13:56'),
     (1,UNHEX('8430DCCE5C1411F0A6350242AC110002'),'3시 20분 부터 307호 발표 시작합니다.',0,'이동석코치님', '2024-07-10 13:12:26'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'),'내일 1시부터 반별로 나만무 발표합니다. \n 306호는 1시에 바로 시작하고, \n 307호 -> 301호 순서로 합니다. ',0,'이동석코치님', '2024-07-10 13:14:23'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),'네 알겠습니다',0,'', '2024-07-10 16:12:26'),
 
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '기획 발표는 최대한 명확하게 문제 정의를 설명하는 데 집중해 주세요.', 0, '이동석코치님', '2024-07-12 11:29:01'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '4시 40분 부터 301호 발표 시작합니다.', 0, '유윤선코치님', '2024-07-11 16:40:00'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '교육동 4층 402호 ~ 405호 교육장 탈취 등 작업으로 인해 7/18(금)까지 출입이 금지됩니다. 또한, 해당 공간 내 에어콘 및 전열교환기 사용이 절대 금지됩니다. 참고하여 주시기 바랍니다. 감사합니다.', 0, '유윤선코치님', '2024-07-11 09:15:32'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '내일 일정 사전 공유드립니다.\n1400-1700 나만무 중간 발표  (장소: 정글 스테이지)\n내일 발표는 306호, 307호, 301호 순으로 진행됩니다.\n306호는 14시까지 정글 스테이지에 착석 해 주시기 바랍니다.\n앞 반의 발표가 마무리될 즈음 공지드릴 예정이니, 다음 반 발표자분들은 미리 정글 스테이지로 이동해 주시기 바랍니다.\n또한, 다른 반의 기획 발표를 듣고 싶으신 분은 자유롭게 참여하실 수 있습니다.', 0, '유윤선코치님', '2024-07-11 11:03:11'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '노동부 심사위원단이 7월 7일(월) 오후 1시부터 최대 4시간 동안 교육 현장 점검을 진행할 예정입니다.\n오후 2시가 아니라 1시입니다!!\n점심 식사 후에 모든 교육생들은 교육장에서 학습 해 주시기 바랍니다.', 0, '유윤선코치님', '2024-07-11 13:27:55'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '<p>안녕하십니까 정글러 여러분~\n다음주 월,화요일 코치 커피챗 신청을 원하시는 분들은 <a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/Slack-LMS-Project-Team3/Slack-LMS/blob/channel_test/FE/public/sw.js">링크</a>에 접속 후 신청룰을 참고하여 기입 부탁드립니다.\n저녁식사 맛있게 드세요. 정글</p>', 0, '유윤선코치님', '2024-07-11 18:02:41'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '오늘 발표 순서가 유동적일 수 있으니, 미리 발표 자료를 점검해 주세요.', 0, '이동석코치님', '2024-07-12 09:14:23'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '정글 스테이지는 13시부터 사용 가능합니다. 해당 시간 이전에는 출입을 자제해 주세요.', 0, '이동석코치님', '2024-07-12 14:48:37'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '발표 전 리허설은 각 조에서 자율적으로 진행해 주세요. 공간 예약은 커뮤니티보드 참고.', 0, '이동석코치님', '2024-07-12 15:41:50'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '307호 발표자는 10분 전까지 정글 스테이지 앞 대기 부탁드립니다.', 0, '이동석코치님', '2024-07-12 16:55:18'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '<p>안녕하십니까 정글러 여러분~\n다음주 월,화요일 코치 커피챗 신청을 원하시는 분들은 <a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/Slack-LMS-Project-Team3/Slack-LMS/blob/channel_test/FE/public/sw.js">링크</a>에 접속 후 신청룰을 참고하여 기입 부탁드립니다.\n저녁식사 맛있게 드세요. 정글</p>', 0, '유윤선코치님', '2024-07-11 18:02:41'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '오늘 발표 순서가 유동적일 수 있으니, 미리 발표 자료를 점검해 주세요.', 0, '이동석코치님', '2024-07-12 17:14:23'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '정글 스테이지는 13시부터 사용 가능합니다. 해당 시간 이전에는 출입을 자제해 주세요.', 0, '이동석코치님', '2024-07-12 17:48:37'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '기획 발표는 최대한 명확하게 문제 정의를 설명하는 데 집중해 주세요.', 0, '이동석코치님', '2024-07-12 19:29:01'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '발표 전 리허설은 각 조에서 자율적으로 진행해 주세요. 공간 예약은 커뮤니티보드 참고.', 0, '이동석코치님', '2024-07-12 19:41:50'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '307호 발표자는 10분 전까지 정글 스테이지 앞 대기 부탁드립니다.', 0, '이동석코치님', '2024-07-12 13:55:18'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '오늘도 발표자료를 슬라이드 형태로 제출하지 않으신 분들은 꼭 제출 부탁드립니다.', 0, '이동석코치님', '2024-07-12 15:20:44'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '점심시간 이후에는 에너지 충전을 충분히 하고 발표에 임해 주세요!', 0, '이동석코치님', '2024-07-12 16:13:32'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '발표 피드백은 슬랙 채널에 공지된 양식을 참고해서 작성 바랍니다.', 0, '이동석코치님', '2024-07-12 17:28:19'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '내일 스테이지 예약은 오늘 저녁 8시까지 마감됩니다. 늦지 않게 신청해주세요.', 0, '이동석코치님', '2024-07-12 18:55:03'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '오늘 하루도 수고 많으셨습니다. 각 조 피드백은 내일 오전까지 정리해 드릴게요.', 0, '이동석코치님', '2024-07-12 21:37:46'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '오늘도 발표자료를 슬라이드 형태로 제출하지 않으신 분들은 꼭 제출 부탁드립니다.', 0, '이동석코치님', '2024-07-12 15:20:44'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '점심시간 이후에는 에너지 충전을 충분히 하고 발표에 임해 주세요!', 0, '이동석코치님', '2024-07-12 16:13:32'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '발표 피드백은 슬랙 채널에 공지된 양식을 참고해서 작성 바랍니다.', 0, '이동석코치님', '2024-07-12 17:28:19'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '내일 스테이지 예약은 오늘 저녁 8시까지 마감됩니다. 늦지 않게 신청해주세요.', 0, '이동석코치님', '2024-07-12 18:55:03'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '오늘 하루도 수고 많으셨습니다. 각 조 피드백은 내일 오전까지 정리해 드릴게요.', 0, '이동석코치님', '2024-07-12 21:37:46'),
     (1, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '식당 운영 관련 정책 리마인드 및 음식물 쓰레기 최소화를 위한 협조 요청\n-외부음식은 20시 이후에만 식당에서 취식 가능합니다(단, 일요일은 종일 가능). 외부음식 취식 관련 정책을 반드시 준수하여 주세요.\n 식당에서 배출되는 음식물 쓰레기 최소화를 위해, 10인 이상의 회식(외부 식당 이용 또는 배달 음식 취식)이 예정되어 있을 경우 1일 전까지 코치진 또는 운영팀에 알려 주시기 바랍니다.', 0, '이동석코치님', '2024-07-11 14:33:19'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '안녕하십니까 정글러 여러분\n 다음주 월,화요일 코치 커피챗 신청을 원하시는 분들은 링크 에 접속 후 신청룰을 참고하여 기입 부탁드립니다.', 0, '유윤선코치님', '2024-07-16 21:16:23'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://docs.google.com/spreadsheets/d/1TJwPk-ouY0S6WZm54-8CovGEOavEiZ6M/edit?gid=1806443967#gid=1806443967">링크</a></p> 로 접속 바랍니다.', 0, '유윤선코치님', '2024-07-16 21:16:25'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), 'AWS 정글 8기  Paddlet 주소입니다.\n<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://padlet.com/feaver85/8-hw1426cs3xbpkncr">AWS링크</a></p> \n AWS 클라우드 환경 관련 질문 있으신 분들은 상기 사이트에 이용 해보시기 바랍니다.', 0, '유윤선코치님', '2024-07-16 22:16:23'),


     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '4시 40분 부터 301호 발표 시작합니다.', 0, '유윤선코치님', '2024-07-11 16:40:00'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '교육동 4층 402호 ~ 405호 교육장 탈취 등 작업으로 인해 7/18(금)까지 출입이 금지됩니다. 또한, 해당 공간 내 에어콘 및 전열교환기 사용이 절대 금지됩니다. 참고하여 주시기 바랍니다. 감사합니다.', 0, '유윤선코치님', '2024-07-11 09:15:32'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '내일 일정 사전 공유드립니다.\n1400-1700 나만무 중간 발표  (장소: 정글 스테이지)\n내일 발표는 306호, 307호, 301호 순으로 진행됩니다.\n306호는 14시까지 정글 스테이지에 착석 해 주시기 바랍니다.\n앞 반의 발표가 마무리될 즈음 공지드릴 예정이니, 다음 반 발표자분들은 미리 정글 스테이지로 이동해 주시기 바랍니다.\n또한, 다른 반의 기획 발표를 듣고 싶으신 분은 자유롭게 참여하실 수 있습니다.', 0, '유윤선코치님', '2024-07-11 11:03:11'),
     (1, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '노동부 심사위원단이 7월 7일(월) 오후 1시부터 최대 4시간 동안 교육 현장 점검을 진행할 예정입니다.\n오후 2시가 아니라 1시입니다!!\n점심 식사 후에 모든 교육생들은 교육장에서 학습 해 주시기 바랍니다.', 0, '유윤선코치님', '2024-07-11 13:27:55'),

     (2,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),'여기 이모지 보내지나요 😶',0,'', '2024-07-10 16:03:26'),
     (2, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '네 잘 보내집니다. ^^', 0, '유윤선코치님', '2024-07-10 16:04:34'),
     (2, UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), '질문이 있습니다', 0, '박은채', '2024-07-08 07:20:16'),
     (2, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'), '점검 몇 시에 끝날까요?', 0, '신명훈', '2024-07-03 13:20:37'),
     (2, UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), '질문이 있습니다', 0, '박은채', '2024-07-10 23:51:12'),
     (2, UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), '이거 왜 바로바로 안 보내지죠?', 0, '박은채', '2024-07-04 06:40:53'),
     (2, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '점검은 14:00 ~ 15:00 까지 진행될 예정입니다. 불편을 드려서 죄송합니다 ', 0, '유윤선코치님', '2024-07-14 11:10:34'),
     (2, UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'), '혹시 예비군 관련서류는 어떻게 진행하면 될까요', 0, '이찬석', '2024-07-06 08:39:16'),
     (2, UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'), '넵 감사합니다!', 0, '이찬석', '2024-07-10 09:13:45'),
     (2, UNHEX('CEF6C2175C1711F0A8650242AC110002'), '<증명서 요청 방법>\n\n성명, 생년월일, 참여 과정명 (예: 홍길동, 2000.01.01, 정글 8기)\n문서 발급 사유 (예: 예비군 훈련 연기, 실업급여 지급 증빙, 교육참여 확인서)\n문서 제출처 (예: 예비군 동대, 고용센터)\n문서상 반드시 포함되어야 하는 내용 기재 (예: ① 이름, ② 생년월일, ③ 참여 과정명, ④ MM.DD ~ MM.DD 기간의 출석기록)', 0, '유윤선코치님', '2024-07-05 06:03:02'),
     (2,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),'안녕하세요!',0,'', '2024-07-10 17:12:26'),
     (2,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),'질문이 있습니다!',0,'', '2024-07-10 16:12:26'),
     (2,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),'혹시 기숙사 에어콘이 중간에 멈추던데 혹시 언제 꺼지는지 알 수 있을까요?',0,'', '2024-07-07 16:22:26'),

     (2,UNHEX('8430DCCE5C1411F0A6350242AC110002'),'에어콘은 기숙사에서 점심에 자동으로 꺼지게 되어있습니다^^ 식사후 방에가셔서 다시 키면 될꺼같습니다.',0,'이동석코치님', '2024-07-07 16:32:26'),
     (3, UNHEX('8430DCCE5C1411F0A6350242AC110002'), '외워서 푸는 건 한계가 있어요. 원리를 알고 코드를 짜면 언젠가 분명히 실력이 폭발합니다.', 0, '이동석코치님', '2024-07-06 15:52:50'),
     (3, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'), '넵, 감사합니다', 0, '신명훈', '2024-07-12 12:40:58'),
     (3, UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), '넵, 감사합니다', 0, '박은채', '2024-07-05 09:07:48'),
     (3, UNHEX('545A4AB45C8611F0A8650242AC110002'), '재귀 함수 아직도 개념이 헷갈리는데, 쉽게 이해하는 법 있을까?', 0, '정경호', '2024-07-10 08:03:12'),
     (3, UNHEX('802E0FE95C8611F0A8650242AC110002'), '완전탐색 문제 푸는 팁 있으면 공유 부탁!', 0, '최효식', '2024-07-10 08:43:28'),
     (3, UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), '기초 정렬 구현 코드 같이 보실 분?', 0, '박은채', '2024-07-10 09:07:11'),
     (3, UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'), '정수론은 소수 판별부터 머리가 아프네.. 좋은 문제 추천?', 0, '안유진', '2024-07-10 09:25:03'),
     (3, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'), '배열 인덱스 실수 너무 자주 나네.. 디버깅 팁 있음?', 0, '신명훈', '2024-07-10 09:59:14'),
     (3, UNHEX('545A4AB45C8611F0A8650242AC110002'), '시간 복잡도 줄이는 패턴 좀 공유해주실 수 있나요?', 0, '정경호', '2024-07-10 10:10:27'),
     (3, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'), '완전탐색에서 visited 배열 없으면 안 되나?', 0, '김윤석', '2024-07-10 10:44:56'),
     (3, UNHEX('CCCCCAAAAAAAAAAAAEEAAAAADDDD'), '재귀 함수 depth가 깊어질 때 에러 나는 거 해결법?', 0, '이찬석', '2024-07-10 11:05:41'),
     (3, UNHEX('9F95C1F15C8411F0A8650242AC110002'), '이중 for문 쓸 때 시간복잡도 항상 n^2인가요?', 0, '김준혁', '2024-07-10 11:42:37'),
     (3, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'), '배열 복사 shallow, deep 차이 다시 한 번 정리해볼까요?', 0, '신명훈', '2024-07-10 12:01:50'),
     (3, UNHEX('1F61345F5C8611F0A8650242AC110002'), '기초 알고리즘 문제 중 추천 좀 해주세요!', 0, '임구철', '2024-07-10 12:18:33'),
     (3, UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), '반복문으로 풀다가 재귀로 바꾸니 코드가 더 간결해졌어요!', 0, '박은채', '2024-07-10 13:02:14'),
     (3, UNHEX('CCCCCAAAAAAAAAAAAEEAAAAADDDD'), '문자열 정렬할 때 기준 문자 지정하는 방법 알면 좋을 듯요.', 0, '이찬석', '2024-07-10 13:16:29'),
     (3, UNHEX('545A4AB45C8611F0A8650242AC110002'), '재귀로 푸는 게 이득인 상황 예시 아시는 분?', 0, '정경호', '2024-07-10 13:39:45'),
     (3, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'), '문자열 자르는 split()이랑 슬라이싱 차이 궁금합니다.', 0, '신명훈', '2024-07-10 14:05:21'),
     (3, UNHEX('802E0FE95C8611F0A8650242AC110002'), '문자열 관련해서 자주 쓰는 메서드 모아볼까요?', 0, '최효식', '2024-07-10 14:19:37'),
     (3, UNHEX('545A4AB45C8611F0A8650242AC110002'), '정렬 stable vs unstable 개념 깔끔하게 이해한 분?', 0, '정경호', '2024-07-10 14:44:44'),
     (3, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'), '재귀 함수에서 return이 언제 되는지 직관적으로 잘 모르겠어.', 0, '김윤석', '2024-07-10 15:06:58'),
     (3, UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), '네 알겠습니다', 0, '박은채', '2024-07-10 16:12:26'),
     (3, UNHEX('32F2411E5C8611F0A8650242AC110002'), '정렬은 어느 알고리즘이 제일 직관적인 것 같아?', 0, '임준혁', '2024-07-10 16:28:32'),
     (3, UNHEX('545A4AB45C8611F0A8650242AC110002'), '배열 최대값 찾는 반복문 최적화 방법 있을까요?', 0, '정경호', '2024-07-10 17:05:47'),
     (3, UNHEX('6F0AC5FD5C8411F0A8650242AC110002'), '기초 알고리즘 공부할 때 제일 먼저 해야 할 건 뭐라고 생각해?', 0, '김세현', '2024-07-10 17:23:11'),
     (3, UNHEX('545A4AB45C8611F0A8650242AC110002'), '기초 정렬은 시각적으로 보면 이해가 더 잘 되더라', 0, '정경호', '2024-07-10 17:41:56'),
     (3, UNHEX('BEA1232F5C8511F0A8650242AC110002'), '완전탐색에서 pruning 꼭 써야 하나요?', 0, '박은범', '2024-07-10 18:02:18'),
     (3, UNHEX('CCCCCAAAAAAAAAAAAEEAAAAADDDD'), '재귀보다 반복문이 더 편하지 않나요? 혹시 반례 있음?', 0, '이찬석', '2024-07-10 18:30:04'),
     (3, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'), '재귀 함수 디버깅할 때 call stack 보는 게 도움 되나요?', 0, '김윤석', '2024-07-10 18:51:36'),
     (3, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'), '수학적 사고 필요한 정수론 유형 정리하면 도움 될 듯요.', 0, '신명훈', '2024-07-10 19:15:47'),
     (3, UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), '배열 순서 바꾸는 함수 중 가장 효율적인 거 뭐 있을까요?', 0, '박은채', '2024-07-10 19:45:33'),
     (3, UNHEX('CCCCCAAAAAAAAAAAAEEAAAAADDDD'), '문자열 길이 제한 있을 때 어떻게 처리하시나요?', 0, '이찬석', '2024-07-10 20:11:24'),
     (3, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'), '반복문 변수 i 대신 다른 알파벳 쓰면 가독성 좋아질까요?', 0, '신명훈', '2024-07-10 20:43:38'),
     (3, UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), '<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://abundant-carver-c3f.notion.site/2-1bfd5b3e6ec5805f8692e887523a3441?pvs=4">목요일 시험대비 유형별 문제 리스틉니다</a><br>문제 다풀어서 풀거없다 하는 알고리즘 똑똑이들이나 저처럼 플레문제 따위는 시원하게 포기한 헛똑똑이들은 참고하세욧</p>', 0, '박은채', '2024-03-25 21:23:45'),
     (3, UNHEX('BEA1232F5C8511F0A8650242AC110002'),
     '<ul>
     <li><p>장기 취업준비로 인한 좌절감을 어떻게 컨트롤 하는지?</p>
     <ul>
          <li><p>온 세상이 나를 거부한다는 생각이 들 수 있다. 동욱님은 함께하는 친구들과 함께 희화화하며 흘러보낼 수 있었다.</p></li>
          <li><p>같이 걸을 수 있는 동료를 만들면 좋겠다. 무리에서 먼저 탈출하는 동료가 생기더라도 연연하지 말자. 기나긴 삶의 여정이라고 생각하자.</p></li>
          <li><p>혼자 남았을 때는 소설책을 많이 읽었다. 마음이 가는 등장인물에 자신을 투영해 위로를 얻었다. e.g. 하이큐</p></li>
     </ul>
     </li>
     <li><p>알고리즘 문제를 푸는 것에 대한 조언?</p>
     <ul>
          <li><p>GPT 등장으로 인해 온라인 알고리즘 테스트를 치는 기업은 적어졌다.</p></li>
          <li><p>알고리즘, 자료구조는 개발자로서의 필수 지식으로써 공부한다면 괜찮지만, 코딩 테스트만을 위해서는 비관적이다.</p></li>
          <li><p>타겟하는 회사를 명확히 해서 필요한지를 먼저 파악하자.</p></li>
          <li><p>오답노트를 활용하자. 정리할 때는 내 후배들에게 이 알고리즘을 설명한다는 생각으로 접근하자. 꼭 이 방법이 아니더라도 나에게 효율적인 방법을 찾아보자.</p></li>
     </ul>
     </li>
     <li><p>GPT, Copilot 활용을 어디까지 허용해야 할까?</p>
     <ul>
          <li><p>본인이 그룹에서 가장 실력있는 개발자가 되면 모두가 따를 것이다. 그렇지 않은 상황에서 규칙을 만들고 지켰는지를 따지는 것은 무의미하다고 생각한다.</p></li>
          <li><p>본인에게 맞는 방법과 허용 범위를 먼저 학습해보고 효과를 보고 전파하는 방향을 해보기를 추천한다.</p></li>
          <li><p>인프랩 구성원에게도 LLM을 적극 활용해라고 권장하나, 내가 쓰는 프로그램의 단축키 정도는 다 알고 있어야 하고, 간단한 코드 정도는 직접 칠 수 있어야 한다. (구구단은 외울 수 있어야 하는 개념)</p></li>
          <li><p>모니터에 시선을 고정한 채 2-3시간 집중, 몰입할 수 있는 경험과 능력이 중요하다.</p></li>
     </ul>
     </li>
     <li><p>회사에서, 학습에서 돌부리에 치일 때마다 일어날 수 있는 마음가짐이 있다면?</p>
     <ul>
          <li><p>동욱님 인생에서 동욱님이 생각하는 최고의 반전은 자기 자신이었다. 그때마다 "이대로 있기는 너무 아쉽지 않나?" 라는 생각을 했다.</p></li>
          <li><p>말만 하고 행동하지 않으면 안된다고 생각했다. 생각만 너무 많으면, 행동할 수 없게 된다.</p></li> 
          <li><p>번아웃은 극복해야 할 대상이 아니라, 예방해야 할 대상이라고 생각한다.</p></li>
          <li><p>잠들기 전, 자기 전에 핸드폰을 보며 누워있다는 건 그날 하루가 만족스럽지 못했다는 것이다. 동욱님은 그런 날들을 돌아보면 타인에게 휘둘리며 나를 위해 쓴 시간이 없던 시기더라.</p></li>
          <li><p>취업을 하면 방학이 없다. 앞으로 40년 이상 롱런하려면 여행 등의 특별한 이벤트가 아니라, 매일 매일 만족할 수 있을만한 소소한 무언가를 만들어야 한다.</p></li>
          <li><p><strong>동욱쓰팁</strong></p>
          <ul>
               <li><p>아침 시간 활용하기</p></li>
               <li><p>일기 쓰기: 감정을 너무 솔직하게 쓰지 말고, 사실만 적기. 그리고 다음 날 그 사건을 긍정적으로 바라보며 서술하기</p></li>
          </ul>
          </li>
     </ul>
     </li>
     <li><p>어떤 가치관을 가진, 어떤 경험을 가진 동료와 함께 일하기를 좋아하시는지?</p>
     <ul>
          <li><p>득점왕 되는게 중요한게 아니라 우승팀을 만드는 것이 중요하다.</p></li>
          <li><p>조직이 잘되게 하기 위해 노력해 본 사람이 면접도 잘보고, 일도 잘 하더라</p></li>
          <li><p>원팀으로 일하는게 중요하다. RnR이 나눠져 있더라도 백업이 필요하면 언제든지 나설 수 있는 마음 가짐이 우승하는 팀을 만든다.</p></li>
          <li><p>보통 BE가 먼저 끝나는 경우가 많다. 이때 잘못된 리더십은 왜 FE는 아직 못끝냈는지를 꼬투리 삼는다.</p></li>
          <li><p>하지만 좋은 리더라면 이 사람을 돕기 위해 뭘 해야할지를 찾고, 팀이 함께 성장할 수 있는 방법을 찾는다.</p></li>
          <li><p>1. 팀 스포츠를 해본 경험</p></li>
          <li><p>2. 만년 후보 선수로 있더라도 팀으로써 승리해봤던 경험</p></li>
     </ul>
     </li>
     </ul>',
     0, '박은범', '2024-04-10 08:21:36'),
     (3, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),
     '<p>팀별 면담 시간에 나온 질문 내용들 공유하면 좋을 것 같아서 올려요~</p>
     <ol>
     <li><p>커리큘럼 상 OS 과정에서 어떤 것을 배우는지</p>
          <p>- 2달차에 C 언어 공부, C를 이용한 웹 서버 구현 이후, 3달차에 PintOS를 이용해 CSAPP 내용 실습. 초빙 교수님들 특강도 있을 예정.(2회 정도)</p>
     </li>
     <li><p>정글 수료 이후에 개발 공부는 어떻게 진행하는게 좋을지.</p>
          <p>- 조금 더 시간이 지난 이후에, 본인의 특성을 파악하고 좀 더 구체적인 이야기를 하는게 좋을것 같다.</p>
     </li>
     <li><p>현재 KDT 과정 수강 중인데, 하루에 정해진 공부 시작, 종료 시간 대신, 하루 공부 총 시간으로 출석을 체크하는 것은 안되는지.</p>
          <p>- 문의 해보겠음.</p>
     </li>
     <li><p>헬스장에  추가 기구 구비 가능 여부.</p>
          <p>- 안전상의 이유로 구비해두지 않았으나, 그런 문의들이 많아서 생각 해보겠음.</p>
     </li>
     </ol>',
     0, '김윤석', '2024-03-17 15:46:23'),
     (3, UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),
     '<ol>
     <li><p>정글 종료 후 추천하는 진로</p>
          <p>-&gt; 가능하면 무조건 취직 (취직후 성장 &gt; 정글에서의 성장 &gt; 독학을 통한 성장)</p>
     </li>
     <li><p>알고리즘 문제 푸는 방식</p>
          <p>-&gt; 가급적 머리에서 어떻게 풀 건지를 100% 구상한 다음 코드를 써라. (50~60% 계획으로 코드한 뒤 디버깅하면서 정답에 근접하는 방식 지양)</p>
     </li>
     </ol>',
     0, '이재웅', '2024-03-17 17:48:57'),
     (3, UNHEX('802E0FE95C8611F0A8650242AC110002'),
     '<p>다음 주 평일 중 백승현 코치님(이전에 알고리즘 설명해 주신 코치님입니다) 커피챗이 있습니다.</p>
     <p>반 마다 3명씩 신청 가능하다고 합니다.(307호도 3명)</p>
     <p>백승현 게임테크랩 코치님 커피챗 희망하시는 분은 여기 스레드에 댓글로 남겨주세요!</p>
     <p><strong>승민)</strong> 승현코치님 시간 이슈로 세 분 밖에 커피챗이 불가하니, 질문을 취합한 후 세 분이 대표로 질문하는 형태로 하는 것이 어떨지 의견 드립니다!</p>',
     0, '최효식', '2024-07-10 16:35:42'),

     (14, UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'), '나 차은우임', 0, '이재웅', '2024-07-09 08:45:29'),
     (15, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'), '안녕~ 반가워~', 0, '신명훈', '2024-07-09 07:16:44'),
     (15, UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), '안녕', 0, '박은채', '2024-07-04 16:02:41'),
     (16, UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'), '오늘 9시에 10+@K 달리기 합니다. 참석자 이모지 달아줘.', 0, '이재웅', '2024-07-13 14:29:55'),
     (16, UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'), '참석', 0, '신명훈', '2024-07-13 20:57:03'),
     (16, UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), '참석', 0, '박은채', '2024-07-13 19:45:28'),
     (16, UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'), '참석', 0, '이찬석', '2024-07-13 19:41:18'), 
     (16, UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'), '참석', 0, '안유진', '2024-07-13 19:41:18');

INSERT INTO jungle_slam.refresh_tokens (id,user_id,token,user_name) VALUES
     (UNHEX('0575F69EA7584D10B33A8E7E6A135580'),UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWEiLCJlbWFpbCI6ImlhbWxlZTEwM0BnbWFpbC5jb20iLCJleHAiOjE3NTIwMTgwOTF9.cT61XkdJtubGSs97dzhffc3St57XClxZDOfP-3oI6SU','이재웅'),
     (UNHEX('098D09BFF5BF4DAB934807BD3447EAFA'),UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2NjY2NhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWRkZGQiLCJlbWFpbCI6Imlyb290dzExQGdtYWlsLmNvbSIsImV4cCI6MTc1MTk5NTkyOH0.rH-cy_gmrMl7YNFSP6aT5zUfP_-6NR7cljQ8Fy1qyTM','신명훈'),
     (UNHEX('11CC267E96A64C03AE2C952418964973'),UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDVlYTQ5Y2ZkOTFmNDFhMGJlNjNjYWNlMTcxOGRlNzEiLCJlbWFpbCI6ImFuZXdqZWFuMDBAZ21haWwuY29tIiwiZXhwIjoxNzUxOTk2NzUyfQ.VH-gFKU81kz-I9JZQkre0ZABcR_kuMy4T567pWlK5PI','안유진'),
     (UNHEX('25D91D460E2C4C2285A57AF80C807135'),UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2NjY2NhYWFhYWFhYWFhYWFhYWFhZWVhYWFhYWRkZGQiLCJlbWFpbCI6ImRsOTcwNHRqckBnbWFpbC5jb20iLCJleHAiOjE3NTIwMzA3NTF9.6ZsliZl7KOKYONciw1rtv8gSEn9h3IbcToac1a4nX9c','이찬석'),
     (UNHEX('2A49505F1EAE4497884853841BBD9CBD'),UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2NjY2NhYWFhYWFhYWFhYmJiYWFhZWVhYWFhYWRkZGQiLCJlbWFpbCI6Imdoa3FoMDlAZ21haWwuY29tIiwiZXhwIjoxNzUxOTk0Njk0fQ.RRQM3h4L8k5aoA9CihRYOkA9GBVmsOzubfVoQY9Cs8s','박은채'),
     (UNHEX('88C4B0EA5BFF11F0A1F20242AC110002'),UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2NjY2NhYWFhYWFhYWFhYmJiYWFhZWVhYWFhYWRkZGQiLCJlbWFpbCI6Imdoa3FoMDlAZ21haWwuY29tIiwiZXhwIjoxNzUxOTk0Njk0fQ.RRQM3h4L8k5aoA9CihRYOkA9GBVmsOzubfVoQY9Cs8s', '김윤석');

INSERT INTO jungle_slam.roles (id, name, workspace_id, admin, announce, course, channel) VALUES
	(1, 'Admin',1,1,1,1,1),
	(2, 'Guest',1,0,0,0,0),
     (3, 'Coach',1,0,1,1,1),
	(4, 'Jungler',1,0,0,0,1);

INSERT INTO jungle_slam.sections (id,workspace_id,name) VALUES
     (1,1,'Announcements'),
     (2,1,'Courses'),
     (3,1,'Channels'),
     (4,1,'Direct Messages');

INSERT INTO jungle_slam.tab_members (workspace_id,user_id,tab_id,user_name) VALUES
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),1,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),1,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),1,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),1,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),1,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),1,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),1,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),2,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),2,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),2,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),2,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),2,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),2,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),2,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),3,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),3,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),3,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),3,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),3,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),3,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),3,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),4,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),4,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),4,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),4,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),4,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),4,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),4,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),5,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),5,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),5,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),5,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),5,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),5,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),5,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),6,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),6,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),6,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),6,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),6,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),6,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),6,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),7,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),7,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),7,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),7,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),7,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),7,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),7,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),8,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),8,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),8,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),8,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),8,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),8,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),8,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),9,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),9,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),9,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),9,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),9,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),9,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),9,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),10,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),10,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),10,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),10,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),10,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),10,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),10,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),11,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),11,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),11,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),11,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),11,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),11,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),11,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),12,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),12,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),12,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),12,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),12,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),12,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),12,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),13,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),13,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),13,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),13,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),13,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),13,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),13,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),14,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),14,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),14,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),14,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),14,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),14,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),14,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),15,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),15,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),15,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),15,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),15,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),15,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),15,'김민중'),
     (1,UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),16,'안유진'),
     (1,UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),16,'이재웅'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),16,'김윤석'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),16,'신명훈'),
     (1,UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),16,'이찬석'),
     (1,UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),16,'박은채'),
     (1,UNHEX('E2EB5DE9609D11F0A5420242AC110002'),16,'김민중'),




INSERT INTO jungle_slam.tabs (name,workspace_id,section_id,url) VALUES
     ('정글 공지 채널',1,1,NULL),
     ('Q&A',1,1,NULL),
     ('[WEEK01] 알고리즘 기초, 재귀 함수, 정렬, 완전탐색',1,2,NULL),
     ('[WEEK02] 이분탐색, 분할정복, 스택, 큐, 우선순위 큐',1,2,NULL),
     ('[WEEK03] 그래프, BFS, DFS, 위상정렬',1,2,NULL),
     ('[WEEK04] 동적 프로그래밍, 그리디 알고리즘',1,2,NULL),
     ('[WEEK05] C언어, 자료구조, 알고리즘',1,2,NULL),
     ('[WEEK06] Red-Black Tree',1,2,NULL),
     ('[WEEK07] Malloc Lab',1,2,NULL),
     ('[WEEK08] 웹서버 만들기',1,2,NULL),
     ('[WEEK09](PintOS)Threads',1,2,NULL),
     ('[WEEK10-11](PintOS) User Programs',1,2,NULL),
     ('[WEEK12-13](PintOS)Virtual Memory',1,2,NULL),
     ('나만무3팀',1,3,NULL),
     ('9기 공지',1,1,NULL),
     ('307호',1,3,NULL),
     ('301호',1,3,NULL),
     ('306호',1,3,NULL),
     ('10기 공지',1,1,NULL),
     ('농구 사기단',1,3,NULL),
     ('전체 공지',1,1,NULL);
     
 

    
INSERT INTO jungle_slam.member_roles (user_id, role_id, user_name)
VALUES
  (UNHEX('1F61345F5C8611F0A8650242AC110002'), 3, '임구철'),
  (UNHEX('42E101A25C8611F0A8650242AC110002'), 3, '정진영'),
  (UNHEX('545A4AB45C8611F0A8650242AC110002'), 3, '정경호'),
  (UNHEX('03DF0C255C8611F0A8650242AC110002'), 3, '이민하'),
  (UNHEX('32F2411E5C8611F0A8650242AC110002'), 3, '임준혁'),
  (UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'), 1, '이재웅'),
  (UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'), 1, '안유진'),
  (UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'), 1, '신명훈'),
  (UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'), 1, '이찬석'),
  (UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), 1, '박은채'),
  (UNHEX('8430DCCE5C1411F0A6350242AC110002'), 2, '이동석코치님'),
  (UNHEX('CEF6C2175C1711F0A8650242AC110002'), 2, '유윤선코치님'),
  (UNHEX('802E0FE95C8611F0A8650242AC110002'), 3, '최효식'),
  (UNHEX('6F0AC5FD5C8411F0A8650242AC110002'), 3, '김세현'),
  (UNHEX('9F95C1F15C8411F0A8650242AC110002'), 3, '김준혁'),
  (UNHEX('BEA1232F5C8511F0A8650242AC110002'), 3, '박은범'),
  (UNHEX('E662D0245C8511F0A8650242AC110002'), 3, '손채민'),
  (UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'), 3, '김윤석'),
  (UNHEX('E2EB5DE9609D11F0A5420242AC110002'), 3, '김민중');

INSERT INTO jungle_slam.users (id,name,email,provider,provider_id,workspace_id) VALUES
     (UNHEX('03DF0C255C8611F0A8650242AC110002'),'이민하','minhyay01@gmail.com','local',NULL,1),
     (UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'),'안유진','anewjean00@gmail.com','google','115239687263793657172',1),
     (UNHEX('1F61345F5C8611F0A8650242AC110002'),'임구철','goochul175465@gmail.com','local',NULL,1),
     (UNHEX('32F2411E5C8611F0A8650242AC110002'),'임준혁','jhim0228@gmail.com','local',NULL,1),
     (UNHEX('42E101A25C8611F0A8650242AC110002'),'정진영','jy.juniper.jeong@gmail.com','local',NULL,1),
     (UNHEX('545A4AB45C8611F0A8650242AC110002'),'정경호','jkhkorea2028@gmail.com','local',NULL,1),
     (UNHEX('6F0AC5FD5C8411F0A8650242AC110002'),'김세현','sehyun5004@gmail.com','local',NULL,1),
     (UNHEX('802E0FE95C8611F0A8650242AC110002'),'최효식','gytlr0785@gmail.com','local',NULL,1),
     (UNHEX('8430DCCE5C1411F0A6350242AC110002'),'이동석코치님','dongseok@gmail.com','local',NULL,1),
     (UNHEX('9F95C1F15C8411F0A8650242AC110002'),'김준혁','kjh91207@gmail.com','local',NULL,1),
     (UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),'이재웅','iamlee103@gmail.com','google','117720446956390792239',1),
     (UNHEX('BEA1232F5C8511F0A8650242AC110002'),'박은범','eun4005@gmail.com','local',NULL,1),
     (UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'),'김윤석','yunsuk224@gmail.com','google','102405209671119574595',1),
     (UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'),'신명훈','irootw11@gmail.com','google','102959621092836114036',1),
     (UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'),'이찬석','dl9704tjr@gmail.com','google','111699399539889639007',1),
     (UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'),'박은채','ghkqh09@gmail.com','google','116758020634952483923',1),
     (UNHEX('CEF6C2175C1711F0A8650242AC110002'),'유윤선코치님','uuu@gmail.com','local',NULL,1),
     (UNHEX('E662D0245C8511F0A8650242AC110002'),'손채민','sonchaemin89@gmail.com','local',NULL,1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110002'),'김민중','91minjung@gmail.com','google', NULL, 1),


     (UNHEX('E2EB5DE9609D11F0A5420242AC110001'), '권민성', 'user1@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110022'), '김관수', 'user2@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110003'), '김별', 'user3@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110004'), '김세헌', 'user4@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110005'), '김재현', 'user5@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110006'), '김현준', 'user6@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110007'), '박성현', 'user7@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110008'), '박준식', 'user8@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110009'), '백지원', 'user10@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11000A'), '석재민', 'user11@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11000B'), '오주영', 'user12@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11000C'), '원산하', 'user13@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11000D'), '윤석주', 'user14@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11000E'), '윤정환', 'user15@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11000F'), '이세창', 'user16@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110010'), '이영준', 'user17@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110011'), '이원규', 'user18@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110012'), '이유민', 'user19@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110013'), '이윤아', 'user20@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110014'), '이현재', 'user21@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110015'), '장지민', 'user22@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110016'), '정승민', 'user23@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110017'), '조완기', 'user24@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110018'), '조정민', 'user25@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110019'), '지준배', 'user26@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11001A'), '최우석', 'user27@gmail.com', 'google', NULL, 1),

     (UNHEX('E2EB5DE9609D11F0A5420242AC11002B'), '김경연', 'user28@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11002C'), '김대원', 'user29@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11002D'), '김명석', 'user30@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11002E'), '김성광', 'user31@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110030'), '김예찬', 'user33@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110031'), '김윤호', 'user34@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110033'), '김진혁', 'user36@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110034'), '김태용', 'user37@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110035'), '노기윤', 'user38@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110036'), '박지성', 'user39@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110037'), '배재준', 'user40@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110038'), '설현아', 'user41@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110039'), '신동주', 'user42@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11003A'), '안채호', 'user43@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11003B'), '윤성원', 'user44@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11003C'), '이시우', 'user45@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11003D'), '이시현', 'user46@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11003E'), '이의재', 'user47@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC11003F'), '임재홍', 'user48@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110040'), '장예지', 'user49@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110041'), '장은수', 'user50@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110042'), '정권호', 'user51@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110043'), '정소영', 'user52@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110044'), '정현우', 'user53@gmail.com', 'google', NULL, 1),
     (UNHEX('E2EB5DE9609D11F0A5420242AC110045'), '조윤호', 'user54@gmail.com', 'google', NULL, 1);








INSERT INTO jungle_slam.workspace_members (id,user_id,workspace_id,nickname,email,image,github,blog) VALUES
    (UNHEX('04C520DA5C8611F0A8650242AC110002'), UNHEX('03DF0C255C8611F0A8650242AC110002'), 1, '이민하', 'minhyay01@gmail.com', NULL, NULL, NULL),
    (UNHEX('2066CA895C8611F0A8650242AC110002'), UNHEX('1F61345F5C8611F0A8650242AC110002'), 1, '임구철', 'goochul175465@gmail.com', NULL, NULL, NULL),
    (UNHEX('3546C7635C8611F0A8650242AC110002'), UNHEX('32F2411E5C8611F0A8650242AC110002'), 1, '임준혁', 'jhim0228@gmail.com', NULL, NULL, NULL),
    (UNHEX('4598DA5E5C8611F0A8650242AC110002'), UNHEX('42E101A25C8611F0A8650242AC110002'), 1, '정진영', 'jy.juniper.jeong@gmail.com', NULL, NULL, NULL),
    (UNHEX('5627A73F5C8611F0A8650242AC110002'), UNHEX('545A4AB45C8611F0A8650242AC110002'), 1, '정경호', 'jkhkorea2028@gmail.com', NULL, NULL, NULL),
    (UNHEX('80DAEE565C8611F0A8650242AC110002'), UNHEX('802E0FE95C8611F0A8650242AC110002'), 1, '최효식', 'gytlr0785@gmail.com', NULL, NULL, NULL),
    (UNHEX('85049B055C8411F0A8650242AC110002'), UNHEX('6F0AC5FD5C8411F0A8650242AC110002'), 1, '김세현', 'sehyun5004@gmail.com', NULL, NULL, NULL),
    (UNHEX('88C4AC635BFF11F0A1F20242AC110002'), UNHEX('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'), 1, '이재웅', 'iamlee103@gmail.com', 'https://stqnq5ux4599.edge.naverncp.com/data2/content/image/2023/04/24/.cache/512/202304240914899.jpg', 'https://github.com/jaewoong', 'https://blog.jaewoong.dev'),
    (UNHEX('88C4AF655BFF11F0A1F20242AC110002'), UNHEX('05EA49CFD91F41A0BE63CACE1718DE71'), 1, '안유진', 'anewjean00@gmail.com', 'https://image.fnnews.com/resource/media/image/2023/10/14/202310140602016302_l.jpg', 'https://github.com/bob', 'https://blog.bob.dev'),
    (UNHEX('88C4B0EA5BFF11F0A1F20242AC110002'), UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAA'), 1, '김윤석', 'yunsuk224@gmail.com', 'https://i.namu.wiki/i/TaNHF90GTgXSwRxcX8rCC9MGWwP9viBkpx6qlHQ6rgA-mq0ydwL9EIjfDbNirNp5Df_bL6SGO31sCGVlk_H2-WRKV0oedSqf7AVlhh2jwsDoraYX1FGc27vCeEk2lr4l9fW1LuPxGOH2W53wqrlbAg.webp', 'https://github.com/rasegqw', 'https://blog.alice.dev'),
    (UNHEX('88C4B1755BFF11F0A1F20242AC110002'), UNHEX('CCCCCAAAAAAAAAAAAAAAAAAAAAAADDDD'), 1, '신명훈', 'irootw11@gmail.com', 'https://i.namu.wiki/i/izVXkClWRy9-s5DAkC_lGo3za4Zy9seGH1V6AM0qZJzsckE9eWe6-Hp-1OvJm_DkVv7BL7U0Ar7QB89ApaklkQ.webp', 'https://github.com/alice', 'https://blog.alice.dev'),
    (UNHEX('88C4B1E85BFF11F0A1F20242AC110002'), UNHEX('CCCCCAAAAAAAAAAAAAAAAEEAAAAADDDD'), 1, '이찬석', 'dl9704tjr@gmail.com', 'https://media1.tenor.com/m/JZTIyLcEhKAAAAAd/%ED%95%91%EA%B5%AC-%ED%95%91%EA%B5%AC-%EB%AC%BC%EA%B0%9C.gif', 'https://githu1b.com/alice', 'https://blog.alice.dev'),
    (UNHEX('88C4B2555BFF11F0A1F20242AC110002'), UNHEX('CCCCCAAAAAAAAAABBBAAAEEAAAAADDDD'), 1, '박은채', 'ghkqh09@gmail.com', 'https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F09%2Faa-run-hani-s-production-released-a-follow-up-model-trailer-info-01.jpg?q=75&w=800&cbr=1&fit=max', 'https://github.com/alice', 'https://blog.alice.dev'),
    (UNHEX('A07609D85C8411F0A8650242AC110002'), UNHEX('9F95C1F15C8411F0A8650242AC110002'), 1, '김준혁', 'kjh91207@gmail.com', NULL, NULL, NULL),
    (UNHEX('C6CB40145C8511F0A8650242AC110002'), UNHEX('BEA1232F5C8511F0A8650242AC110002'), 1, '박은범', 'eun4005@gmail.com', NULL, NULL, NULL),
    (UNHEX('E0DBC45F5C1711F0A8650242AC110002'), UNHEX('CEF6C2175C1711F0A8650242AC110002'), 1, '유윤선코치님', 'uuu@gmail.com', 'https://velog.velcdn.com/images/seeh_h/post/a83a9cf0-2365-4946-9d0d-96ec782c4c86/image.png', NULL, NULL),
    (UNHEX('E7159E115C8511F0A8650242AC110002'), UNHEX('E662D0245C8511F0A8650242AC110002'), 1, '손채민', 'sonchaemin89@gmail.com', NULL, NULL, NULL),
    (UNHEX('F11E8FC75C1411F0A6350242AC110002'), UNHEX('8430DCCE5C1411F0A6350242AC110002'), 1, '이동석코치님', 'dongseok@gmail.com', 'https://upload.wikimedia.org/wikipedia/commons/5/5a/SOL%EC%BA%90%EB%A6%AD%ED%84%B0.png', NULL, NULL),
    (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110002'), 1, '김민중', '91minjung@gmail.com', NULL, NULL, NULL),

     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110001'), 1, '권민성', 'user1@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110022'), 1, '김관수', 'user2@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110003'), 1, '김별', 'user3@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110004'), 1, '김세헌', 'user4@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110005'), 1, '김재현', 'user5@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110006'), 1, '김현준', 'user6@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110007'), 1, '박성현', 'user7@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110008'), 1, '박준식', 'user8@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110009'), 1, '백지원', 'user10@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11000A'), 1, '석재민', 'user11@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11000B'), 1, '오주영', 'user12@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11000C'), 1, '원산하', 'user13@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11000D'), 1, '윤석주', 'user14@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11000E'), 1, '윤정환', 'user15@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11000F'), 1, '이세창', 'user16@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110010'), 1, '이영준', 'user17@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110011'), 1, '이원규', 'user18@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110012'), 1, '이유민', 'user19@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110013'), 1, '이윤아', 'user20@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110014'), 1, '이현재', 'user21@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110015'), 1, '장지민', 'user22@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110016'), 1, '정승민', 'user23@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110017'), 1, '조완기', 'user24@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110018'), 1, '조정민', 'user25@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110019'), 1, '지준배', 'user26@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11001A'), 1, '최우석', 'user27@gmail.com', NULL, NULL, NULL),

     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11002B'), 1, '김경연', 'user28@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11002C'), 1, '김대원', 'user29@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11002D'), 1, '김명석', 'user30@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11002E'), 1, '김성광', 'user31@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110030'), 1, '김예찬', 'user33@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110031'), 1, '김윤호', 'user34@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110033'), 1, '김진혁', 'user36@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110034'), 1, '김태용', 'user37@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110035'), 1, '노기윤', 'user38@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110036'), 1, '박지성', 'user39@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110037'), 1, '배재준', 'user40@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110038'), 1, '설현아', 'user41@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110039'), 1, '신동주', 'user42@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11003A'), 1, '안채호', 'user43@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11003B'), 1, '윤성원', 'user44@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11003C'), 1, '이시우', 'user45@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11003D'), 1, '이시현', 'user46@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11003E'), 1, '이의재', 'user47@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC11003F'), 1, '임재홍', 'user48@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110040'), 1, '장예지', 'user49@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110041'), 1, '장은수', 'user50@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110042'), 1, '정권호', 'user51@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110043'), 1, '정소영', 'user52@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110044'), 1, '정현우', 'user53@gmail.com', NULL, NULL, NULL),
     (UNHEX(REPLACE(UUID(), '-', '')), UNHEX('E2EB5DE9609D11F0A5420242AC110045'), 1, '조윤호', 'user54@gmail.com', NULL, NULL, NULL);






INSERT INTO jungle_slam.workspaces (name) VALUES
     ('정글'),
     ('게임랩'),
     ('게임테크랩');