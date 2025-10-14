import { NextResponse } from "next/server";
import { getCloudinarySignature } from "@/lib/cloudinary";

export async function GET() {
  try {
    const signatureData = await getCloudinarySignature();
    return NextResponse.json(signatureData);
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    );
  }
}
