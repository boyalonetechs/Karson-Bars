export const runtime = "nodejs";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const catboxForm = new FormData();
    catboxForm.append("reqtype", "fileupload");
    catboxForm.append(
      "fileToUpload",
      new Blob([buffer], { type: file.type || "application/octet-stream" }),
      file.name || "receipt",
    );


    const res = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: catboxForm,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; GifterBreadfruitBars/1.0)",
      },
    });

    const text = await res.text();

    if (!res.ok || !text.startsWith("http")) {
      return Response.json({ error: text || "Upload failed" }, { status: 502 });
    }

    return Response.json({ url: text });
  } catch (err) {
    return Response.json(
      { error: err.message || "Upload failed" },
      { status: 500 },
    );
  }
}
