import { NextRequest, NextResponse } from 'next/server';
import { postDataToGAS } from '@/lib/gas';

export async function POST(request: NextRequest) {
  try {
    // フロントエンドから送られたデータを取得
    const formData = await request.json();
    // GASへデータを送信
    const result = await postDataToGAS(formData);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    const errorText = `Error submitting data to GAS: ${
      error instanceof Error ? error.message : 'Unknown error'
    }`;
    console.error(errorText);
    return NextResponse.json(
      { success: false, error: errorText },
      { status: 500 },
    );
  }
}
