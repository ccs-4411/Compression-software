from flask import Flask, request, send_file
import subprocess
import uuid
import os

app = Flask(__name__)

UPLOAD = "uploads"
OUT = "outputs"
os.makedirs(UPLOAD, exist_ok=True)
os.makedirs(OUT, exist_ok=True)

@app.route("/compress", methods=["POST"])
def compress():
    file = request.files["file"]

    input_path = f"{UPLOAD}/{uuid.uuid4()}.mp4"
    output_path = f"{OUT}/{uuid.uuid4()}.mp4"

    file.save(input_path)

    subprocess.run([
        "ffmpeg",
        "-i", input_path,
        "-vf", "scale=854:-2",
        "-c:v", "libx264",
        "-crf", "26",
        "-preset", "fast",
        "-c:a", "aac",
        "-b:a", "128k",
        output_path
    ])

    return send_file(output_path, as_attachment=True)

@app.route("/")
def home():
    return "FFmpeg Server Running"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
