import { createWriteStream } from "fs";
import archiver from "archiver";

console.log("Starting build for Komorebi...");

let output = createWriteStream("MatrixWallpaper_Komorebi.zip");

let archive = archiver("zip");
archive.on("error", function (err) {
	throw err;
});

console.log(`Archiving "./src_komorebi"...`);

archive.pipe(output);

archive.directory("./src_komorebi", "matrix_wallpaper");

archive.finalize();

output.on("close", function () {
	console.log(`Wrote ${archive.pointer()} bytes to "MatrixWallpaper_Komorebi.zip"`);
	console.log("You are ready to go!\n");
});