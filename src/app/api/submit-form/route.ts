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
    console.error('Error submitting data to GAS:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}