contract SimpleSign {

    event Created(
        address indexed from,
        bytes32 id
    );
    event Signed(
        address indexed from,
        bytes32 docId,
        uint id,
        bytes16 signType,
        bytes sign
    );

    address owner;

    mapping (bytes32 => Document) documents;
    uint documentsCount;
    mapping (uint => bytes32) ids;

    struct Document {
        address organizer;
        uint signsCount;
        mapping (uint => Sign) signs;
    }

    struct Sign {
        address signer;
        bytes16 signType;
        bytes   sign;
    }

    function SimpleSign() {
        owner = msg.sender;
    }

    function createDocument(uint nonce) returns (bytes32 docId) {
        docId = generateId(nonce);
        if (documents[docId].organizer != 0) throw;
        uint index = documentsCount++;
        ids[index] = docId;
        documents[docId] = Document(msg.sender, 0);
        Created(msg.sender, docId);
    }

    function addSignature(bytes32 docId, bytes16 _type, bytes _sign) {
        Document doc = documents[docId];
        if (doc.organizer != msg.sender) throw;
        uint idx = doc.signsCount++;
        doc.signs[idx] = Sign(msg.sender, _type, _sign);
        Signed(msg.sender, docId, idx, _type, _sign);
    }

    function getDocumentsCount() returns (uint) {
        return documentsCount;
    }

    function getDocumentDetails(bytes32 docId) returns (address organizer, uint count) {
        Document doc = documents[docId];
        organizer = doc.organizer;
        count = doc.signsCount;
    }

    function getSignsCount(bytes32 docId) returns (uint) {
        return documents[docId].signsCount;
    }

    function getSignDetails(bytes32 docId, uint signId) returns (address, bytes16) {
        Document doc = documents[docId];
        Sign s = doc.signs[signId];
        return (s.signer, s.signType);
    }

    function getSignData(bytes32 docId, uint signId) returns (bytes) {
        Document doc = documents[docId];
        Sign s = doc.signs[signId];
        return s.sign;
    }

    function generateId(uint nonce) returns (bytes32) {
        return sha3(msg.sender, nonce);
    }

    function getIdAtIndex(uint index) returns (bytes32) {
        return ids[index];
    }

}
