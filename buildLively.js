import { createWriteStream } from "fs";
import archiver from "archiver";

console.log("Starting build for Lively Wallpaper...");

let output = createWriteStream("Matrix Wallpaper (Lively Wallpaper).zip");

let archive = archiver("zip");
archive.on("error", function (err) {
	throw err;
});

console.log(`Archiving "./src" and "./src_lively"...`);

archive.pipe(output);

archive.directory("./src", false);
archive.directory("./src_lively", false);

archive.finalize();

output.on("close", function () {
	console.log(`Wrote ${archive.pointer()} bytes to "Matrix Wallpaper (Lively Wallpaper).zip"`);
	console.log("You are ready to go!\n");
});