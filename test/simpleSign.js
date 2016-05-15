contract('SimpleSign', function(accounts) {
  
  it("create document", function(done) {
    var meta = SimpleSign.deployed();

    meta.createDocument(web3.toBigNumber('0x101'), {from: accounts[0]}).then(function(tx_id) {
      assert.isNotNull(tx_id);
    }).then(done).catch(done);

  });

  it("add signature", function (done) {
    var meta = SimpleSign.deployed();
    var docId = null;

    meta.generateId.call(web3.toBigNumber('0x102'), accounts[0]).then(function(_docId) {
      docId = _docId;
      return meta.createDocument(web3.toBigNumber('0x102'), {from: accounts[0]});
    }).then(function(tx_id) {
      return meta.getDocumentDetails.call(docId)
    }).then(function(currentDocument) {
      assert.equal(0, currentDocument[1].toNumber());

      const type = web3.toBigNumber(web3.fromAscii('md5', 16));
      const sign = web3.toBigNumber('0x22644302c3e19ebe6dec2a59e388bfe8');
      return meta.addSignature(docId, type, sign, {from: accounts[0], gas: 2000000});
    }).then(function(tx_id) {
      return meta.getDocumentDetails.call(docId);
    }).then(function(currentDocument) {
      assert.equal(1, currentDocument[1].toNumber());

      return meta.getSignDetails.call(docId, web3.toBigNumber(0));
    }).then(function(signDetails) {
      assert.equal(accounts[0], signDetails[0]);
      assert.equal('md5', web3.toAscii(signDetails[1]).replace(/\u0000/g, ''));

      return meta.getSignData.call(docId, web3.toBigNumber(0));
    }).then(function(signature) {
      assert.equal('0x22644302c3e19ebe6dec2a59e388bfe8', web3.toHex(signature));
    }).then(done).catch(done);

  });

  it("cannot add signature to others document", function(done) {
    var meta = SimpleSign.deployed();

    const me = accounts[0];
    const other = accounts[1];
    assert.notEqual(me, other, "Different accounts");
    const nonce = web3.toBigNumber('0x103');

    const type = web3.toBigNumber(web3.fromAscii('md5', 16));
    const sign = web3.toBigNumber('0x22644302c3e19ebe6dec2a59e388bfe8');
    var docId = null;

    meta.generateId.call(nonce, other).then(function(_docId) {
      docId = _docId;
      return meta.createDocument(nonce, {from: other});
    }).then(function(tx_id) {
      meta.addSignature(docId, type, sign, {from: me, gas: 2000000}).then(function() {
        try {
          assert.fail('executed', 'should not be executed', 'should not execute');
        } catch (e) {
          done(e);
        }
      }).catch(function(res) {
        assert.include(res.message, 'VM Exception while executing transaction: invalid JUMP');
        done();
      });
    }).catch(done);
  });

  it("add few signatures", function (done) {
    var meta = SimpleSign.deployed();
    var docId = null;
    const nonce = web3.toBigNumber('0x104');

    meta.generateId.call(nonce, accounts[0]).then(function(_docId) {
      docId = _docId;
      return meta.createDocument(nonce, {from: accounts[0]});
    }).then(function(tx_id) {
      return meta.getDocumentDetails.call(docId)
    }).then(function (currentDocument) {
      assert.equal(0, currentDocument[1].toNumber());

      const type = web3.toBigNumber(web3.fromAscii('md5', 16));
      const sign = web3.toBigNumber('0x22644302c3e19ebe6dec2a59e388bfe8');
      return meta.addSignature(docId, type, sign, {from: accounts[0], gas: 2000000});
    }).then(function(tx_id) {
      return meta.getDocumentDetails.call(docId)
    }).then(function(currentDocument) {
      assert.equal(1, currentDocument[1].toNumber());

      const type = web3.toBigNumber(web3.fromAscii('sha512', 16));
      const sign = web3.toBigNumber('0xc9a73eaf0d4b779ad790fd3e558412eaa2dba774bff85084d58b954025e49d5dfc33c9d8fff9eecc69538205cddeaff584c8fef189ee809ad2be71b1d7de549e');
      return meta.addSignature(docId, type, sign, {from: accounts[0], gas: 2000000});
    }).then(function(tx_id) {
      return meta.getDocumentDetails.call(docId);
    }).then(function(currentDocument) {
      assert.equal(2, currentDocument[1].toNumber());

      return meta.getSignData.call(docId, web3.toBigNumber(0));
    }).then(function (signatureFirst) {
      assert.equal('0x22644302c3e19ebe6dec2a59e388bfe8', web3.toHex(signatureFirst));
      return meta.getSignData.call(docId, web3.toBigNumber(1));
    }).then(function (signatureSecond) {
      assert.equal('0xc9a73eaf0d4b779ad790fd3e558412ea' +
                     'a2dba774bff85084d58b954025e49d5d' +
                     'fc33c9d8fff9eecc69538205cddeaff5' +
                     '84c8fef189ee809ad2be71b1d7de549e', web3.toHex(signatureSecond));
    }).then(done).catch(done);

  });

});
