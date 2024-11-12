import { formatEther } from "viem";

class Proposal {
  name: string;
  votes: number;
  index: number;
  constructor({ name, votes, index }:{name:string, index:number, votes:number}) {
    this.name = name;
    this.votes = votes
    this.index=index
  }  
  display() {
    console.log(`${this.name} ${formatEther(BigInt(this.votes))} vote(s)`)
  }
  details(spacing:number) {
    console.log(`${this.name.padEnd(spacing, ' ')} ${this.index} `)
  }
}

export default Proposal