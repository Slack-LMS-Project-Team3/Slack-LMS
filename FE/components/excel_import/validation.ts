export function filterUsers(data: any[]): { users: any[]; errors: string[] } {
  const errors: string[] = [];
  const users: any[] = [];
  const allowedRoles = [
    "staff",
    "coach junior",
    "admin",
    "student",
    "alamni",
    "coach senior",
  ];

  for (const row of data) {
    // 필수 필드 검증
    if (!row.name || !row.email || !row.group) {
      // 빈 데이터가 있는 행 번호를 포함하여 에러 메시지 생성
      const errorRow = data.indexOf(row) + 2; // 엑셀은 1부터 시작, 헤더가 1행이므로 +2
      const missingFields = [];

      if (!row.name) missingFields.push("이름");
      if (!row.email) missingFields.push("이메일");
      // if (!row.role) missingFields.push("역할");
      if (!row.group) missingFields.push("그룹");

      errors.push(
        `${errorRow}행: ${missingFields.join(", ")} 필드가 비어있습니다.`,
      );
      continue;
    }

    if (!row.email.includes("@") || !row.email.endsWith("@gmail.com")) {
      continue;
    }

    users.push(row);
  }
  return {
    users,
    errors,
  };
}
