import CryptoJS from 'crypto-js';
import utf8 from 'utf8';

class Blockchain {
    constructor() {
        this.chain = [];
        this.current_transactions = [];
    }
    new_block(proof, previous_hash=null) {
        let block = {
            "index": this.chain.length + 1,
            'timestamp': Date.now(),
            "transactions": this.current_transactions,
            "proof": proof,
            "previous_hash": previous_hash | this.hash(this.chain[-1])
        }
        this.current_transactions = [];
        this.chain.push(block);
        return block;
    }
    new_transaction(sender, recipient, amount) {
        this.current_transactions.push( { sender, recipient, amount } );
        return this.chain[this.chain["length"]-1]["index"] + 1;
    }
    hash(block) {
        let block_string = JSON.stringify(block);
        let hashed = CryptoJS.SHA256(block_string);
        return hashed.toString(CryptoJS.enc.Base64)
    }
    proof_of_work(last_proof) {
        let proof = 0;
        while(!this.valid_proof(last_proof, proof)) {
            proof++;
        }
        return proof;
    }
    valid_proof(last_proof, proof) {
        let guess = utf8.encode(`${last_proof}${proof}`);
        let guess_hash = CryptoJS.SHA256(guess).toString(CryptoJS.enc.Hex);
        return guess_hash.substr(0,4) === '0000';
    }
}
