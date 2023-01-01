import * as crypto from "crypto";
import axon from "axon";

interface BlockShape {
  hash: String;
  prevHash: String;
  height: Number;
  data: String;
}

class Block implements BlockShape {
  public hash: String;

  constructor(
    public prevHash: String,
    public height: Number,
    public data: String
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: String, height: Number, data: String) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class BlockChain {
  private blocks: Block[];

  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }

  public addBlock(data: String) {
    this.blocks.push(
      new Block(this.getPrevHash(), this.blocks.length + 1, data)
    );
  }

  public getBlocks() {
    return [...this.blocks];
  }
}

const blockChain = new BlockChain();

blockChain.addBlock("First one");
blockChain.addBlock("Second one");
blockChain.addBlock("Third one");

console.log(blockChain.getBlocks());
