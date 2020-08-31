App = {

    web3Provider: null,
    contracts: {},
    account: '0x0',
  
    
    init:  function () {
        return  App.initWeb3();
    },
  
    // initWeb3: function () 
    // {
    //     // // if (typeof web3 !== 'undefined') {
    //     //     App.web3Provider = web3.currentProvider;
    //     //     web3 = new Web3(web3.currentProvider);
  
    //     // }
  
    
    //         App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    //         web3 = new Web3(App.web3Provider);
  
  
    //         console.log('hereeee');
  
        
  
    //     // console.log('hereeee');
    //     return App.initContract();
  
    // },
  

    initWeb3:function() {

      if (window.ethereum) {
        App.web3Provider = window.ethereum;
        
        try {
          // Request account access
          window.ethereum.enable();
        } catch (error) {
          // User denied account access...
          console.error("User denied account access")
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = window.web3.currentProvider;
      }

      // If no injected web3 instance is detected, fall back to Ganache
      else {
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }

      web3 = new Web3(App.web3Provider);
      console.log('ijjjjncs');
  
      return App.initContract();
      
    },
  

    initContract: function() {
        
        $.getJSON("../insurance.json",

            function (insurance) {
              // console.log('hereeeeppwdpwdp');
                // console.log(insurance);

                App.contracts.Insurance = TruffleContract(insurance);

                App.contracts.Insurance.setProvider(App.web3Provider);
  
                // console.log('sccc',App.contracts.Demo);
  
                return App.render();
  
            }
        );
  
    },
  
    render: function () {
  
        console.log(web3.eth);
        console.log('ppppppp',App.contracts.Insurance);
  
        App.contracts.Insurance.deployed().then(
            function (instance) {
              console.log(instance);
            }
        )
//   
    },

    addDoctor: function () {
        var address = $('.address').val();
        App.contracts.Insurance.deployed().then(
            function (instance) {
                instance.setDoctor(address).then(
                console.log('success'),
                $('.address').html('')
                )
            }
        )
    },

    addPatient: function () {
        var name = $('.name').val();
        var amount = $('.amount').val();
        var uid = $('.id').val();

        App.contracts.Insurance.deployed().then(
            function (instance) {
                instance.setCitizen(uid,name,amount).then(
                // console.log('donee'),
                instance.showCitizen(uid).then(
                    function (params) {
                        console.log(params)
                        // $('.disp').html(params)
                    }
                )
                )
                // console.log('sett')
            
            }
        )
       

    },

    showCitizen:function () {

        var uid = $('.puid').val();        
        App.contracts.Insurance.deployed().then(
            function (instance) {
                instance.showCitizen(uid).then(
                    function (params) {
                        console.log(params)

                    }
                )
                              // console.log('sett')
            
            }
        )
    },

    claim:function () {
        
        var pid = $('.pid').val();
        var amount = $('.required-amount').val();

        App.contracts.Insurance.deployed().then(
            function (instance) {
                instance.claimAmount(pid,amount).then(
                console.log('donee'),
               
                )
                // console.log('sett')
            
            }
        )



    }

}


  
  


  $(function () {
    $(window).load(function () {
        App.init();
    });
  });