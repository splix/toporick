contract SimpleSign {

    event Created(
        address indexed from,
        uint id
    );
    event Signed(
        address indexed from,
        uint docId,
        uint id,
        bytes16 signType,
        bytes sign
    );

    address owner;

    mapping (uint => Document) documents;
    uint documentsCount;

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

    function createDocument() returns (uint docId) {
        docId = documentsCount++;
        documents[docId] = Document(msg.sender, 0);
        Created(msg.sender, docId);
    }

    function addSignature(uint id, bytes16 _type, bytes _sign) {
        if (id > documentsCount - 1) throw;
        Document doc = documents[id];
        if (doc.organizer != msg.sender) throw;
        uint idx = doc.signsCount++;
        doc.signs[idx] = Sign(msg.sender, _type, _sign);
        Signed(msg.sender, id, idx, _type, _sign);
    }

    function getDocumentsCount() returns (uint) {
        return documentsCount;
    }

    function getDocumentDetails(uint docId) returns (address organizer, uint count) {
        Document doc = documents[docId];
        organizer = doc.organizer;
        count = doc.signsCount;
    }

    function getSignsCount(uint docId) returns (uint) {
        return documents[docId].signsCount;
    }

    function getSignDetails(uint docId, uint signId) returns (address, bytes16) {
        Document doc = documents[docId];
        Sign s = doc.signs[signId];
        return (s.signer, s.signType);
    }

    function getSignData(uint docId, uint signId) returns (bytes) {
        Document doc = documents[docId];
        Sign s = doc.signs[signId];
        return s.sign;
    }

}
