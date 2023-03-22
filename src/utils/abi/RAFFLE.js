const RAFFLE = [{
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "fungibleToken",
        "type": "address"
    }, {"indexed": false, "internalType": "address", "name": "ticketAddr", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }],
    "name": "AddedAvailableNFT",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "fungibleToken",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "boxIdx", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "NFTId",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "price", "type": "uint256"}],
    "name": "AddedItem",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "fungibleToken",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "boxIdx", "type": "uint256"}],
    "name": "CanceledRaffle",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "fungibleToken",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "boxIdx", "type": "uint256"}],
    "name": "CompletedRaffle",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "fungibleToken",
        "type": "address"
    }, {"indexed": false, "internalType": "address", "name": "admin", "type": "address"}, {
        "indexed": false,
        "internalType": "address",
        "name": "productAddr",
        "type": "address"
    }],
    "name": "CreatedShop",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "fungibleToken", "type": "address"}],
    "name": "DestroyedShop",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "joiner", "type": "address"}, {
        "indexed": false,
        "internalType": "address",
        "name": "fungibleToken",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "boxIdx", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "selectedItem",
        "type": "uint256"
    }, {"indexed": false, "internalType": "address", "name": "addrOfNFT", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "userNFT",
        "type": "uint256"
    }],
    "name": "JoinedRaffle",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "fungibleToken",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "boxIdx", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "itemNumber",
        "type": "uint256"
    }, {"indexed": false, "internalType": "address", "name": "winner", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "raffleTicket",
        "type": "uint256"
    }],
    "name": "LuckyDrawed",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "fungibleToken",
        "type": "address"
    }, {"indexed": false, "internalType": "address", "name": "admin", "type": "address"}, {
        "indexed": false,
        "internalType": "bool",
        "name": "status",
        "type": "bool"
    }],
    "name": "SettedAdmin",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "fungibleToken",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "boxIdx", "type": "uint256"}],
    "name": "StartedRaffle",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "fungibleToken",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "Withdrawed",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "fungibleToken",
        "type": "address"
    }, {"indexed": false, "internalType": "address", "name": "ticketAddr", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "startBlock", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "endBlock",
        "type": "uint256"
    }],
    "name": "createdBox",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "fungibleToken",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "boxIdx", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "NFTId",
        "type": "uint256"
    }],
    "name": "removedItem",
    "type": "event"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "price", "type": "uint256"}, {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
    }], "name": "addItem", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }, {"internalType": "uint256[]", "name": "price", "type": "uint256[]"}, {
        "internalType": "string[]",
        "name": "tokenURI",
        "type": "string[]"
    }], "name": "batchAddItem", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "itemNumber", "type": "uint256"}, {
        "internalType": "address[]",
        "name": "user",
        "type": "address[]"
    }], "name": "batchRefund", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }], "name": "cancelRaffle", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "address",
        "name": "target",
        "type": "address"
    }],
    "name": "checkAdmin",
    "outputs": [{"internalType": "bool", "name": "admin", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "address",
        "name": "ticketAddr",
        "type": "address"
    }, {"internalType": "uint256", "name": "startBlock", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "endBlock",
        "type": "uint256"
    }], "name": "createBox", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "address",
        "name": "productAddr",
        "type": "address"
    }], "name": "createShop", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}],
    "name": "destroyShop",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "price", "type": "uint256"}],
    "name": "discard",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "itemNumber", "type": "uint256"}],
    "name": "draw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }], "name": "endRaffle", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }], "name": "forceEndRaffle", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}],
    "name": "getCurrentBox",
    "outputs": [{"internalType": "uint256", "name": "currentBox", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "itemIdx", "type": "uint256"}],
    "name": "getItem",
    "outputs": [{"internalType": "uint256", "name": "tokenIdOfProduct", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
    }, {"internalType": "uint256[]", "name": "entry", "type": "uint256[]"}, {
        "internalType": "address",
        "name": "winner",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "itemNumber", "type": "uint256"}, {
        "internalType": "address",
        "name": "user",
        "type": "address"
    }],
    "name": "getRefundingAmount",
    "outputs": [{"internalType": "uint256", "name": "refundingAmount", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}],
    "name": "getShop",
    "outputs": [{"internalType": "bool", "name": "admin", "type": "bool"}, {
        "internalType": "address",
        "name": "productAddr",
        "type": "address"
    }, {"internalType": "uint256", "name": "currentBox", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "selectedItem", "type": "uint256"}, {
        "internalType": "address",
        "name": "addrOfNFT",
        "type": "address"
    }, {"internalType": "uint256", "name": "userNFT", "type": "uint256"}],
    "name": "joinRaffle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "itemNumber", "type": "uint256"}, {
        "internalType": "address",
        "name": "user",
        "type": "address"
    }], "name": "refund", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "itemIdx", "type": "uint256"}],
    "name": "removeItem",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "address",
        "name": "admin",
        "type": "address"
    }, {"internalType": "bool", "name": "status", "type": "bool"}],
    "name": "setAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }], "name": "startRaffle", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "usedTicket",
    "outputs": [{"internalType": "bool", "name": "used", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }],
    "name": "viewBox",
    "outputs": [{"internalType": "uint256", "name": "startBlock", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "endBlock",
        "type": "uint256"
    }, {"internalType": "enum RaffleShop.Status", "name": "status", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "boxIdx",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "itemIndex", "type": "uint256"}],
    "name": "viewRaffle",
    "outputs": [{"internalType": "uint256", "name": "ticketAmount", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "fungibleToken", "type": "address"}],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]
module.exports = {
    RAFFLE,
};
