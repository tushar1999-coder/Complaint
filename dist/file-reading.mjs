import * as fs from "fs";
import path from "path";

const main = async () => {
  let relativePath = "./dist/complaint.txt";
  let absolutePath = path.resolve(relativePath);
  let fileContent = fs.readFileSync(absolutePath, "utf-8");
  console.log(fileContent);
  let complaintObject = JSON.parse(fileContent);

  //send fileContent to blockchain
};

export function sendDataToIpfs() {
  main();
}
