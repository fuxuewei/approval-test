export function formatMemberName(member: {
  realName?: string;
  nickName?: string;
  phone?: string;
  email?: string;
  orgNickName?: string;
  orgRealName?: string;
  isVisitor?: boolean;
}) {
  const { realName, nickName, phone, email, orgNickName, orgRealName, isVisitor } = member;

  if (orgRealName?.length && orgNickName?.length)
    return isVisitor ? orgRealName : `${orgRealName}(${orgNickName})`;
  if (realName?.length && nickName?.length) return isVisitor ? realName : `${realName}(${nickName})`;

  return orgRealName || orgNickName || realName || nickName || maskPhoneNumber(phone) || email || "";
}

export function maskPhoneNumber(phone?: string): string {
  if (!phone) return "";
  const digits: string = phone.replace(/\D/g, "");
  const masked: string = digits.slice(0, -8) + "****" + digits.slice(-4);
  return masked;
}
