import hashlib 
import time 


class block:

    def __init__(self,index,data,timestamp,previousHash=''):

        self.index=index
        self.data=data
        self.timestamp=timestamp
        self.previousHash=previousHash
        self.hash=self.calculateHash()



    def calculateHash(self):
        # return sha256((str(self.index) + str(self.data)+ str(self.timestamp) + str(self.previousHash)).encode()).hexdigest()
        
        h=hashlib.sha256()
        h.update( str(self.index).encode('utf-8') + str(self.data).encode('utf-8')+ str(self.timestamp).encode('utf-8') + str(self.previousHash).encode('utf-8') )
        
 
        return h.hexdigest()
        
        




class blockchain:

    def __init__(self):
        self.chain = [self.createGenesis()]

    def createGenesis(self):
        return block(1,'genesisBlock',time.ctime(),'0000')

    def getLatest(self):
        # print(self.chain[-1].hash)
        return self.chain[-1]

    def isValid(self):
        i=1
        l=len(self.chain)


        while(i < len(self.chain)):
            currentBlock=self.chain[i]
            # prevBlock=self.chain[i-1]
            # fwd=self.chain[i+1]          

            if(currentBlock.hash != currentBlock.calculateHash()):
                i+=1
                return False

            # if(currentBlock.previousHash != prevBlock.hash):
            #     i+=1
            #     return False

            i+=1

        cb=self.chain[l-1]
        pb=self.chain[l-2]

        if(cb.previousHash != pb.hash):
            return False
        
        return True


    def addBlock(self,newblock):

        newblock.previousHash=self.getLatest().hash
        newblock.hash=newblock.calculateHash()
        # print(newblock.data)
        self.chain.append(newblock)


        
    def printBlock(self):
        
        for i in range(0,len(self.chain)):
            print(self.chain[i].index)
            print(self.chain[i].data)
            print(self.chain[i].previousHash)
            print(self.chain[i].hash)
            print(self.chain[i].timestamp)
            print("-----------++++++++--------------")


kpCoin = blockchain()

kpCoin.addBlock(block(2,'KP',time.ctime()))

# kpCoin.addBlock(block(3,'lllP',time.ctime()))

kpCoin.printBlock()

# kpCoin.printBlock()

# print(kpCoin.chain[1].data)

kpCoin.chain[1].data='ppppppppppp'

kpCoin.chain[1].hash=kpCoin.chain[1].calculateHash()

val=kpCoin.isValid()

# print(kpCoin.chain[1].hash)

kpCoin.printBlock()

print(val)