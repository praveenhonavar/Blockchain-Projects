from hashlib import sha256
import time 


class block:

    def __init__(self,index,data,timestamp,previousHash=' '):
        self.index=index
        self.data=data
        self.timestamp=timestamp
        self.previousHash=previousHash
        self.hash=self.calculateHash()


    def calculateHash(self):

        return sha256( (str(self.index) + str(self.data)+ str(self.timestamp) + str(self.previousHash) ).encode()).hexdigest()


class blockchain:

    def __init__(self):

        self.chain = [self.createGenesis()]

    def createGenesis(self):
        return block(1,'genesisBlock',time.ctime(),'0000')
        

    def addBlock(self,data):
        i=len(self.chain)
        preBlock=self.chain[-1]
        node=block(i+1,data,time.ctime(),preBlock.hash)
        self.chain.append(node)

    def printBlock(self):
        for i in range(0,len(self.chain)):
            print(self.chain[i].index)
            print(self.chain[i].data)
            print(self.chain[i].previousHash)
            print(self.chain[i].hash)
            print(self.chain[i].timestamp)
            print("--------------------------------")


kpCoin = blockchain()


d=input('Enter data ')
p=input('Enter data ')

kpCoin.addBlock(d)
kpCoin.addBlock(p)


kpCoin.printBlock()

kpCoin.chain[1].data='llllllllllll'


kpCoin.printBlock()






