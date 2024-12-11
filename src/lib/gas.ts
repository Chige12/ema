export async function postDataToGAS(data: { name: string; comment: string }) {
  const gasEndpoint = process.env.GAS_ENDPOINT_URL;

  if (!gasEndpoint) {
    throw new Error("GAS_ENDPOINT_URL is not defined in .env.local");
  }

  const response = await fetch(gasEndpoint, {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log("Response status:", response.status);
  console.log("Response headers:", response.headers);

  // レスポンスのテキストを取得
  const text = await response.text(); 
  console.log("Response text:", text);

  try {
    const result = JSON.parse(text); // JSONとしてパース
    if (!response.ok) {
      throw new Error(result.error || "Failed to post data to GAS");
    }
    return result;
  } catch (error) {
    const errorText = `Failed to parse response as JSON: ${
      error instanceof Error ? error.message : "Unknown error"
    }`;
    throw new Error(errorText);
  }
}

export async function fetchDataFromGAS(params: Record<string, unknown>) {
  const gasEndpoint = process.env.GAS_ENDPOINT_URL;

  if (!gasEndpoint) {
    throw new Error("GAS_ENDPOINT_URL is not defined in .env.local");
  }

  const url = new URL(gasEndpoint);

  // クエリパラメータを設定（必要に応じて）
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  // GASへのGETリクエスト
  const response = await fetch(url.toString(), {
    method: "GET",
    redirect: "follow",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch data from GAS: ${response.status} - ${errorText}`
    );
  }

  // レスポンスをJSONとしてパース
  const data = await response.json(); 
  console.log("Fetched data from GAS:", data);

  return data;
}
