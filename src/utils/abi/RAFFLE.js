const RAFFLE = [{
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
    "inputs": [{"indexed": false, "internalType": "address", "name": "_FT", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "round",
        "type": "uint256"
    }],
    "name": "StartedRaffle",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "_FT", "type": "address"}, {
        "indexed": false,
        "internalType": "address",
        "name": "_NFT",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "round", "type": "uint256"}],
    "name": "addedAvailableNFT",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "_FT", "type": "address"}, {
        "indexed": false,
        "internalType": "address",
        "name": "_NFT",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "round", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "_NFTId",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "_price", "type": "uint256"}],
    "name": "addedItem",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "_FT", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "round",
        "type": "uint256"
    }],
    "name": "canceledRaffle",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "_FT", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "round",
        "type": "uint256"
    }],
    "name": "completedRaffle",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "joiner", "type": "address"}, {
        "indexed": false,
        "internalType": "address",
        "name": "_FT",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "round", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "selectedItem",
        "type": "uint256"
    }, {"indexed": false, "internalType": "address", "name": "NFTAddress", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "userNFT",
        "type": "uint256"
    }],
    "name": "joinedRaffle",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "_FT", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "round",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "itemNumber", "type": "uint256"}, {
        "indexed": false,
        "internalType": "address",
        "name": "winner",
        "type": "address"
    }],
    "name": "luckyDrawed",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "_FT", "type": "address"}, {
        "indexed": false,
        "internalType": "address",
        "name": "_NFT",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "round", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "stratTime",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "endTime", "type": "uint256"}],
    "name": "raffleCreated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "_FT", "type": "address"}, {
        "indexed": false,
        "internalType": "address",
        "name": "_NFT",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "round", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "_NFTId",
        "type": "uint256"
    }],
    "name": "removedItem",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "_FT", "type": "address"}, {
        "indexed": false,
        "internalType": "address",
        "name": "_admin",
        "type": "address"
    }, {"indexed": false, "internalType": "bool", "name": "_status", "type": "bool"}],
    "name": "settedAdmin",
    "type": "event"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "address",
        "name": "_NFT",
        "type": "address"
    }, {"internalType": "uint256", "name": "round", "type": "uint256"}],
    "name": "addAvailableNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "uint256",
        "name": "round",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "_price", "type": "uint256"}, {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
    }], "name": "addItem", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "uint256",
        "name": "round",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "itemNumber", "type": "uint256"}, {
        "internalType": "address[]",
        "name": "user",
        "type": "address[]"
    }], "name": "batchRefund", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "uint256",
        "name": "round",
        "type": "uint256"
    }], "name": "cancelRaffle", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "address",
        "name": "raffleNFT",
        "type": "address"
    }], "name": "createPool", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "address",
        "name": "_NFT",
        "type": "address"
    }, {"internalType": "uint256", "name": "stratTime", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
    }], "name": "createRaffle", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}],
    "name": "destroyPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "price", "type": "uint256"}],
    "name": "discard",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "uint256",
        "name": "round",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "itemNumber", "type": "uint256"}],
    "name": "draw",
    "outputs": [{"internalType": "uint256", "name": "_luckyDraw", "type": "uint256"}, {
        "internalType": "address",
        "name": "_winner",
        "type": "address"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "uint256",
        "name": "round",
        "type": "uint256"
    }], "name": "endRaffle", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "uint256",
        "name": "round",
        "type": "uint256"
    }], "name": "forceEndRaffle", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}],
    "name": "getPool",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}, {
        "internalType": "address",
        "name": "",
        "type": "address"
    }, {"internalType": "uint256", "name": "", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "uint256",
        "name": "round",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "selectedItem", "type": "uint256"}, {
        "internalType": "address",
        "name": "NFTAddress",
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
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "uint256",
        "name": "round",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "itemNumber", "type": "uint256"}, {
        "internalType": "address",
        "name": "user",
        "type": "address"
    }], "name": "refund", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "address",
        "name": "_NFT",
        "type": "address"
    }, {"internalType": "uint256", "name": "round", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "_NFTId",
        "type": "uint256"
    }],
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
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "address",
        "name": "_admin",
        "type": "address"
    }, {"internalType": "bool", "name": "_status", "type": "bool"}],
    "name": "setAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "uint256",
        "name": "round",
        "type": "uint256"
    }], "name": "startRaffle", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_FT", "type": "address"}, {
        "internalType": "uint256",
        "name": "_round",
        "type": "uint256"
    }, {"internalType": "address", "name": "NFTAddress", "type": "address"}, {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "usedToken",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}]

module.exports = {
    RAFFLE
}
