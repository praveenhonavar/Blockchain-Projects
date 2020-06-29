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
        return self.chain[-1]

    def isValid(self):
        i=1
        self.chain.append(block('0','lokl',time.ctime(),self.chain[-1].hash))

        while(i <= len(self.chain)): 
            prevBlock=self.chain[i-1]

            try:
                currentBlock=self.chain[i]

                if(currentBlock.hash != currentBlock.calculateHash()):
                    return False

                if(prevBlock.hash != currentBlock.previousHash):
                    return False

            except:
                pass

            i+=1
        return True

    def addBlock(self,newblock):
        newblock.previousHash=self.getLatest().hash
        newblock.hash=newblock.calculateHash()
        self.chain.append(newblock)

    def printBlock(self):
        for i in range(0,len(self.chain)):
            print(self.chain[i].index)
            print(self.chain[i].data)
            print(self.chain[i].previousHash)
            print(self.chain[i].hash)
            print(self.chain[i].timestamp)
            print("-----------++++++++--------------")


bc=blockchain()

bc.addBlock(block(2,'pd',time.ctime()))
bc.addBlock(block(3,'d',time.ctime()))
bc.addBlock(block(4,'p',time.ctime()))

bc.printBlock()

bc.chain[2].data='loo'
bc.chain[2].hash=bc.chain[2].calculateHash()
bc.printBlock()

val=bc.isValid()

bc.printBlock()


print(val)
