export async function getFiscalInformation(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Failed to get fiscal information data");
  }

  return response.json();
}
