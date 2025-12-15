export function maskEmail(email) {
  if (!email) return "";

  const [id, domain] = email.split("@");
  if (!domain) return email;

  if (id.length <= 2) {
    return id[0] + "*@" + domain;
  }

  const visible = id.slice(0, 2);
  const masked = "*".repeat(id.length - 2);
  return `${visible}${masked}@${domain}`;
}

export function maskName(name) {
  if (!name) return "";

  if (name.length === 1) return "*";
  if (name.length === 2) return name[0] + "*";

  return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
}

export function maskId(text, visible = 3) {
  if (!text) return "";

  if (text.length <= visible) return "*".repeat(text.length);

  return (
    text.slice(0, visible) +
    "*".repeat(text.length - visible)
  );
}

