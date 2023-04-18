/*
 * Copyright (c) 2014 Yoichiro Tanaka. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
    "use strict";

    var MySQL = {};

    if ("undefined" == typeof module) {
        window.MySQL = MySQL;
    } else {
        module.exports = MySQL;
    }
})();

(function() {
    "use strict";

    // Constructor

    var NetworkErrorCode = function() {
        this.errorCodeMap = {
            "-1": "IO_PENDING",
            "-2": "FAILED",
            "-3": "ABORTED",
            "-4": "INVALID_ARGUMENT",
            "-5": "INVALID_HANDLE",
            "-6": "FILE_NOT_FOUND",
            "-7": "TIMED_OUT",
            "-8": "FILE_TOO_BIG",
            "-9": "UNEXPECTED",
            "-10": "ACCESS_DENIED",
            "-11": "NOT_IMPLEMENTED",
            "-12": "INSUFFICIENT_RESOURCES",
            "-13": "OUT_OF_MEMORY",
            "-14": "UPLOAD_FILE_CHANGED",
            "-15": "SOCKET_NOT_CONNECTED",
            "-16": "FILE_EXISTS",
            "-17": "FILE_PATH_TOO_LONG",
            "-18": "FILE_NO_SPACE",
            "-19": "FILE_VIRUS_INFECTED",
            "-20": "BLOCKED_BY_CLIENT",
            "-21": "NETWORK_CHANGED",
            "-22": "BLOCKED_BY_ADMINISTRATOR",
            "-23": "SOCKET_IS_CONNECTED",
            "-100": "CONNECTION_CLOSED",
            "-101": "CONNECTION_RESET",
            "-102": "CONNECTION_REFUSED",
            "-103": "CONNECTION_ABORTED",
            "-104": "CONNECTION_FAILED",
            "-105": "NAME_NOT_RESOLVED",
            "-106": "INTERNET_DISCONNECTED",
            "-107": "SSL_PROTOCOL_ERROR",
            "-108": "ADDRESS_INVALID",
            "-109": "ADDRESS_UNREACHABLE",
            "-110": "SSL_CLIENT_AUTH_CERT_NEEDED",
            "-111": "TUNNEL_CONNECTION_FAILED",
            "-112": "NO_SSL_VERSIONS_ENABLED",
            "-113": "SSL_VERSION_OR_CIPHER_MISMATCH",
            "-114": "SSL_RENEGOTIATION_REQUESTED",
            "-115": "PROXY_AUTH_UNSUPPORTED",
            "-116": "CERT_ERROR_IN_SSL_RENEGOTIATION",
            "-117": "BAD_SSL_CLIENT_AUTH_CERT",
            "-118": "CONNECTION_TIMED_OUT",
            "-119": "HOST_RESOLVER_QUEUE_TOO_LARGE",
            "-120": "SOCKS_CONNECTION_FAILED",
            "-121": "SOCKS_CONNECTION_HOST_UNREACHABLE",
            "-122": "NPN_NEGOTIATION_FAILED",
            "-123": "SSL_NO_RENEGOTIATION",
            "-124": "WINSOCK_UNEXPECTED_WRITTEN_BYTES",
            "-125": "SSL_DECOMPRESSION_FAILURE_ALERT",
            "-126": "SSL_BAD_RECORD_MAC_ALERT",
            "-127": "PROXY_AUTH_REQUESTED",
            "-128": "SSL_UNSAFE_NEGOTIATION",
            "-129": "SSL_WEAK_SERVER_EPHEMERAL_DH_KEY",
            "-130": "PROXY_CONNECTION_FAILED",
            "-131": "MANDATORY_PROXY_CONFIGURATION_FAILED",
            "-133": "PRECONNECT_MAX_SOCKET_LIMIT",
            "-134": "SSL_CLIENT_AUTH_PRIVATE_KEY_ACCESS_DENIED",
            "-135": "SSL_CLIENT_AUTH_CERT_NO_PRIVATE_KEY",
            "-136": "PROXY_CERTIFICATE_INVALID",
            "-137": "NAME_RESOLUTION_FAILED",
            "-138": "NETWORK_ACCESS_DENIED",
            "-139": "TEMPORARILY_THROTTLED",
            "-140": "HTTPS_PROXY_TUNNEL_RESPONSE",
            "-141": "SSL_CLIENT_AUTH_SIGNATURE_FAILED",
            "-142": "MSG_TOO_BIG",
            "-143": "SPDY_SESSION_ALREADY_EXISTS",
            "-145": "WS_PROTOCOL_ERROR",
            "-146": "PROTOCOL_SWITCHED",
            "-147": "ADDRESS_IN_USE",
            "-148": "SSL_HANDSHAKE_NOT_COMPLETED",
            "-149": "SSL_BAD_PEER_PUBLIC_KEY",
            "-150": "SSL_PINNED_KEY_NOT_IN_CERT_CHAIN",
            "-151": "CLIENT_AUTH_CERT_TYPE_UNSUPPORTED",
            "-152": "ORIGIN_BOUND_CERT_GENERATION_TYPE_MISMATCH",
            "-153": "SSL_DECRYPT_ERROR_ALERT",
            "-154": "WS_THROTTLE_QUEUE_TOO_LARGE",
            "-155": "TOO_MANY_SOCKET_STREAMS",
            "-156": "SSL_SERVER_CERT_CHANGED",
            "-157": "SSL_INAPPROPRIATE_FALLBACK",
            "-158": "CT_NO_SCTS_VERIFIED_OK",
            "-159": "SSL_UNRECOGNIZED_NAME_ALERT",
            "-200": "CERT_COMMON_NAME_INVALID",
            "-201": "CERT_DATE_INVALID",
            "-202": "CERT_AUTHORITY_INVALID",
            "-203": "CERT_CONTAINS_ERRORS",
            "-204": "CERT_NO_REVOCATION_MECHANISM",
            "-205": "CERT_UNABLE_TO_CHECK_REVOCATION",
            "-206": "CERT_REVOKED",
            "-207": "CERT_INVALID",
            "-208": "CERT_WEAK_SIGNATURE_ALGORITHM",
            "-210": "CERT_NON_UNIQUE_NAME",
            "-211": "CERT_WEAK_KEY",
            "-212": "CERT_NAME_CONSTRAINT_VIOLATION",
            "-213": "CERT_END",
            "-300": "INVALID_URL",
            "-301": "DISALLOWED_URL_SCHEME",
            "-302": "UNKNOWN_URL_SCHEME",
            "-310": "TOO_MANY_REDIRECTS",
            "-311": "UNSAFE_REDIRECT",
            "-312": "UNSAFE_PORT",
            "-320": "INVALID_RESPONSE",
            "-321": "INVALID_CHUNKED_ENCODING",
            "-322": "METHOD_NOT_SUPPORTED",
            "-323": "UNEXPECTED_PROXY_AUTH",
            "-324": "EMPTY_RESPONSE",
            "-325": "RESPONSE_HEADERS_TOO_BIG",
            "-326": "PAC_STATUS_NOT_OK",
            "-327": "PAC_SCRIPT_FAILED",
            "-328": "REQUEST_RANGE_NOT_SATISFIABLE",
            "-329": "MALFORMED_IDENTITY",
            "-330": "CONTENT_DECODING_FAILED",
            "-331": "NETWORK_IO_SUSPENDED",
            "-332": "SYN_REPLY_NOT_RECEIVED",
            "-333": "ENCODING_CONVERSION_FAILED",
            "-334": "UNRECOGNIZED_FTP_DIRECTORY_LISTING_FORMAT",
            "-335": "INVALID_SPDY_STREAM",
            "-336": "NO_SUPPORTED_PROXIES",
            "-337": "SPDY_PROTOCOL_ERROR",
            "-338": "INVALID_AUTH_CREDENTIALS",
            "-339": "UNSUPPORTED_AUTH_SCHEME",
            "-340": "ENCODING_DETECTION_FAILED",
            "-341": "MISSING_AUTH_CREDENTIALS",
            "-342": "UNEXPECTED_SECURITY_LIBRARY_STATUS",
            "-343": "MISCONFIGURED_AUTH_ENVIRONMENT",
            "-344": "UNDOCUMENTED_SECURITY_LIBRARY_STATUS",
            "-345": "RESPONSE_BODY_TOO_BIG_TO_DRAIN",
            "-346": "RESPONSE_HEADERS_MULTIPLE_CONTENT_LENGTH",
            "-347": "INCOMPLETE_SPDY_HEADERS",
            "-348": "PAC_NOT_IN_DHCP",
            "-349": "RESPONSE_HEADERS_MULTIPLE_CONTENT_DISPOSITION",
            "-350": "RESPONSE_HEADERS_MULTIPLE_LOCATION",
            "-351": "SPDY_SERVER_REFUSED_STREAM",
            "-352": "SPDY_PING_FAILED",
            "-353": "PIPELINE_EVICTION",
            "-354": "CONTENT_LENGTH_MISMATCH",
            "-355": "INCOMPLETE_CHUNKED_ENCODING",
            "-356": "QUIC_PROTOCOL_ERROR",
            "-357": "RESPONSE_HEADERS_TRUNCATED",
            "-358": "QUIC_HANDSHAKE_FAILED",
            "-400": "CACHE_MISS",
            "-401": "CACHE_READ_FAILURE",
            "-402": "CACHE_WRITE_FAILURE",
            "-403": "CACHE_OPERATION_NOT_SUPPORTED",
            "-404": "CACHE_OPEN_FAILURE",
            "-405": "CACHE_CREATE_FAILURE",
            "-406": "CACHE_RACE",
            "-407": "CACHE_CHECKSUM_READ_FAILURE",
            "-408": "CACHE_CHECKSUM_MISMATCH",
            "-501": "INSECURE_RESPONSE",
            "-502": "NO_PRIVATE_KEY_FOR_CERT",
            "-503": "ADD_USER_CERT_FAILED",
            "-601": "FTP_FAILED",
            "-602": "FTP_SERVICE_UNAVAILABLE",
            "-603": "FTP_TRANSFER_ABORTED",
            "-604": "FTP_FILE_BUSY",
            "-605": "FTP_SYNTAX_ERROR",
            "-606": "FTP_COMMAND_NOT_SUPPORTED",
            "-607": "FTP_BAD_COMMAND_SEQUENCE",
            "-701": "PKCS12_IMPORT_BAD_PASSWORD",
            "-702": "PKCS12_IMPORT_FAILED",
            "-703": "IMPORT_CA_CERT_NOT_CA",
            "-704": "IMPORT_CERT_ALREADY_EXISTS",
            "-705": "IMPORT_CA_CERT_FAILED",
            "-706": "IMPORT_SERVER_CERT_FAILED",
            "-707": "PKCS12_IMPORT_INVALID_MAC",
            "-708": "PKCS12_IMPORT_INVALID_FILE",
            "-709": "PKCS12_IMPORT_UNSUPPORTED",
            "-710": "KEY_GENERATION_FAILED",
            "-711": "ORIGIN_BOUND_CERT_GENERATION_FAILED",
            "-712": "PRIVATE_KEY_EXPORT_FAILED",
            "-713": "SELF_SIGNED_CERT_GENERATION_FAILED",
            "-714": "CERT_DATABASE_CHANGED",
            "-800": "DNS_MALFORMED_RESPONSE",
            "-801": "DNS_SERVER_REQUIRES_TCP",
            "-802": "DNS_SERVER_FAILED",
            "-803": "DNS_TIMED_OUT",
            "-804": "DNS_CACHE_MISS",
            "-805": "DNS_SEARCH_EMPTY",
            "-806": "DNS_SORT_ERROR"
        };
    };

    // Public methods

    NetworkErrorCode.prototype.getErrorMessage = function(errorCode) {
        return this.errorCodeMap[String(errorCode)];
    };

    // Export

    MySQL.NetworkErrorCode = NetworkErrorCode;

})();

(function() {
    "use strict";

    // Constructor

    var Hasher = function() {
    };

    // Public methods

    Hasher.prototype.sha1ToWordArray = function(source) {
        return CryptoJS.SHA1(source);
    };

    Hasher.prototype.sha1ToUint8Array = function(source) {
        var wordArray = this.sha1ToWordArray(source);
        return this.wordArrayToUnit8Array(wordArray);
    };

    Hasher.prototype.sha1Uint8ArrayToUint8Array = function(source) {
        var words = this.uint8ArrayToWords(source);
        var sourceWordArray = CryptoJS.lib.WordArray.create(words, source.length);
        return this.sha1ToUint8Array(sourceWordArray);
    };

    Hasher.prototype.uint8ArrayToWords = function(typedArray) {
        var typedArrayByteLength = typedArray.length;
        var words = [];
        for (var i = 0; i < typedArrayByteLength; i++) {
            words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
        }
        return words;
    };

    Hasher.prototype.wordArrayToUnit8Array = function(wordArray) {
        var buffer = new ArrayBuffer(wordArray.sigBytes);
        var view = new DataView(buffer, 0, buffer.byteLength);
        for (var i = 0; i < wordArray.words.length; i++) {
            view.setInt32(i * 4, wordArray.words[i], false);
        }
        return new Uint8Array(buffer);
    };

    // Export

    MySQL.Hasher = Hasher;

})();

(function() {
    "use strict";

    // Constructor

    var BinaryUtils = function() {
        this.encoding = "utf-8";
    };

    // Public methods

    BinaryUtils.prototype.arrayBufferToString = function(buf) {
        var array = new Uint8Array(buf);
        var string = new TextDecoder(this.encoding).decode(array);
        return string;
    };

    BinaryUtils.prototype.stringToArrayBuffer = function(str) {
        var array = new TextEncoder(this.encoding).encode(str);
        var buffer = new ArrayBuffer(array.length);
        var dataView = new DataView(buffer);
        for (var i = 0; i < array.length; i++) {
            dataView.setInt8(i, array[i]);
        }
        return buffer;
    };

    BinaryUtils.prototype.createUint8Array = function(length) {
        var buffer = new ArrayBuffer(length);
        return new Uint8Array(buffer);
    };

    // Export

    MySQL.BinaryUtils = BinaryUtils;

})();

(function(BinaryUtils) {
    "use strict";

    // Constructor

    var Types = function() {
        this.binaryUtils = new MySQL.BinaryUtils();
    };

    // Public methods

    Types.prototype.createFixedLengthInteger = function(value, length) {
        var buffer = new ArrayBuffer(4);
        var view = new DataView(buffer);
        view.setUint32(0, value, true);
        var array = new Uint8Array(buffer);
        var subarray = array.subarray(0, length);
        return subarray;
    };

    Types.prototype.createLengthEncodedString = function(value) {
        var buffer = this.binaryUtils.stringToArrayBuffer(value);
        var view = new Uint8Array(buffer);
        var length = view.length;
        var header = this.createLengthEncodedInteger(length);
        var result = new Uint8Array(header.length + view.length);
        result.set(header, 0);
        result.set(view, header.length);
        return result;
    };

    Types.prototype.createNullEndValue = function(buffer) {
        var view = new Uint8Array(buffer);
        var result = new Uint8Array(view.length + 1);
        result.set(view, 0);
        return result;
    };

    Types.prototype.createLengthEncodedInteger = function(value) {
        var result = null;
        var i = 0;
        if (value === null) {
            result = new Uint8Array(1);
            result[0] = 0xFB;
            return result;
        }
        if (0 <= value && value <= 0xFA) {
            result = new Uint8Array(1);
            result[0] = value;
            return result;
        }
        var buffer = new ArrayBuffer(4);
        var view = new DataView(buffer);
        view.setUint32(0, value, false); // 64bit not supported
        var array = new Uint8Array(buffer);
        var length = 4;
        for (i = 0; i < array.length; i++) {
            if (array[i] !== 0) {
                length -= i;
                break;
            }
        }
        if (value >= 0xFB && length == 2) {
            result = new Uint8Array(3);
            result[0] = 0xFC;
            for (i = 0; i < length; i++) {
                result[i + 1] = array[array.length - 1 - i];
            }
            return result;
        } else if (length == 3) {
            result = new Uint8Array(4);
            result[0] = 0xFD;
            for (i = 0; i < length; i++) {
                result[i + 1] = array[array.length - 1 - i];
            }
            return result;
        } else {
            result = new Uint8Array(9);
            result[0] = 0xFE;
            for (i = 0; i < length; i++) {
                result[i + 1] = array[array.length - 1 - i];
            }
            return result;
        }
    };

    Types.prototype.createNullEndString = function(value) {
        var buffer = this.binaryUtils.stringToArrayBuffer(value);
        return this.createNullEndValue(buffer);
    };

    Types.prototype.getNullEndString = function(buffer, offset) {
        var view = new Uint8Array(buffer);
        for (var pos = offset; pos < view.length; pos++) {
            if (view[pos] === 0) {
                break;
            }
        }
        var targetBuffer = new Uint8Array(view.subarray(offset, pos));
        var result = this.binaryUtils.arrayBufferToString(targetBuffer.buffer);
        return {result: result, nextPosition: pos + 1};
    };

    Types.prototype.getFixedLengthString = function(buffer, offset, length) {
        var array = new Uint8Array(buffer);
        var targetBuffer = new Uint8Array(array.subarray(offset, offset + length));
        var result = this.binaryUtils.arrayBufferToString(targetBuffer.buffer);
        return result;
    };

    Types.prototype.getLengthEncodedString = function(buffer, offset) {
        var lengthResult = this.getLengthEncodedInteger(buffer, offset);
        if (lengthResult.result === null) {
            return {result: null, nextPosition: lengthResult.nextPosition};
        } else {
            var result = this.getFixedLengthString(
                buffer, lengthResult.nextPosition, lengthResult.result);
            return {result: result,
                    nextPosition: lengthResult.nextPosition + lengthResult.result};
        }
    };

    Types.prototype.getFixedLengthInteger = function(buffer, offset, length) {
        var source = new Uint8Array(buffer);
        var subarray = source.subarray(offset, offset + length);
        var copied = new Uint8Array(4);
        copied.set(subarray, 0);
        var view = new DataView(copied.buffer, 0, 4);
        var result = view.getUint32(0, true);
        return result;
    };

    Types.prototype.getLengthEncodedInteger = function(buffer, offset) {
        var array = new Uint8Array(buffer);
        var first = array[offset];
        if (first == 0xFB) {
            return {result: null, nextPosition: offset + 1};
        } else if (first <= 0xFA) {
            return {result: first, nextPosition: offset + 1};
        }
        var length = 0;
        if (first == 0xFC) {
            length = 2;
        } else if (first == 0xFD) {
            length = 3;
        } else {
            length = 8;
        }
        var subarray = array.subarray(offset + 1, offset + 1 + length);
        var resultBuffer = new ArrayBuffer(8);
        var resultArray = new Uint8Array(resultBuffer);
        for (var i = 0; i < subarray.length; i++) {
            resultArray[i] = subarray[i];
        }
        var resultView = new DataView(resultBuffer);
        var result = resultView.getInt32(0, true); // Currently 64bit not supported
        return {result: result, nextPosition: offset + 1 + length};
    };

    // Export

    MySQL.Types = Types;

})(MySQL.BinaryUtils);

(function(MySQLTypes) {
    "use strict";

    // Constructor

    var Packet = function(newSequenceNumber, buffer) {
        this.mySQLTypes = new MySQLTypes();
        this.sequenceNumber = newSequenceNumber;
        this.data = buffer;
        this.dataLength = buffer.byteLength;
    };

    // Public methods

    Packet.prototype.getArrayBuffer = function() {
        var result = new ArrayBuffer(4 + this.dataLength);
        var dataLengthArray = this.mySQLTypes.createFixedLengthInteger(this.dataLength, 3);
        var view = new Uint8Array(result);
        view.set(dataLengthArray, 0);
        view[3] = this.sequenceNumber;
        view.set(new Uint8Array(this.data), 4);
        return result;
    };

    // Export

    MySQL.Packet = Packet;

})(MySQL.Types);

(function() {
    "use strict";

    // Constructor

    var InitialHandshakeRequest = function(newProtocolVersion,
                                           newServerVersion,
                                           newConnectionId,
                                           newAuthPluginDataPart1,
                                           newCapabilityFlag1,
                                           newCharacterSet,
                                           newStatusFlags,
                                           newCapabilityFlag2,
                                           newAuthPluginDataLen,
                                           newAuthPluginDataPart2,
                                           newAuthPluginName) {
        this.protocolVersion = newProtocolVersion;
        this.serverVersion = newServerVersion;
        this.connectionId = newConnectionId;
        this.authPluginDataPart1 = newAuthPluginDataPart1;
        this.capabilityFlag1 = newCapabilityFlag1;
        this.characterSet = newCharacterSet;
        this.statusFlags = newStatusFlags;
        this.capabilityFlag2 = newCapabilityFlag2;
        this.authPluginDataLen = newAuthPluginDataLen;
        this.authPluginDataPart2 = newAuthPluginDataPart2;
        this.authPluginName = newAuthPluginName;
    };

    MySQL.InitialHandshakeRequest = InitialHandshakeRequest;

})();

(function() {
    "use strict";

    // Constructor

    var StatusFlags = {
        SERVER_STATUS_IN_TRANS: 0x0001,
        SERVER_STATUS_AUTOCOMMIT: 0x0002,
        SERVER_MORE_RESULTS_EXISTS: 0x0008,
        SERVER_STATUS_NO_GOOD_INDEX_USED: 0x0010,
        SERVER_STATUS_NO_INDEX_USED: 0x0020,
        SERVER_STATUS_CURSOR_EXISTS: 0x0040,
        SERVER_STATUS_LAST_ROW_SENT: 0x0080,
        SERVER_STATUS_DB_DROPPED: 0x0100,
        SERVER_STATUS_NO_BACKSLASH_ESCAPES: 0x0200,
        SERVER_STATUS_METADATA_CHANGED: 0x0400,
        SERVER_QUERY_WAS_SLOW: 0x0800,
        SERVER_PS_OUT_PARAMS: 0x1000
    };

    // Export

    MySQL.StatusFlags = StatusFlags;

})();

(function(StatusFlags) {
    "use strict";

    // Constructor

    var OkResult = function(newAffectedRows,
                            newLastInsertId,
                            newStatusFlags,
                            newWarnings,
                            newInfo) {
        this.affectedRows = newAffectedRows;
        this.lastInsertId = newLastInsertId;
        this.statusFlags = newStatusFlags;
        this.warnings = newWarnings;
        this.info = newInfo;
    };

    // Public methods

    OkResult.prototype.isSuccess = function() {
        return true;
    };

    OkResult.prototype.hasResultset = function() {
        return false;
    };

    OkResult.prototype.isStatusInTrans = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_IN_TRANS) !== 0;
    };

    OkResult.prototype.isAutoCommit = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_AUTOCOMMIT) !== 0;
    };

    OkResult.prototype.isMoreResultsExists = function() {
        return (this.statusFlags & StatusFlags.SERVER_MORE_RESULTS_EXISTS) !== 0;
    };

    OkResult.prototype.isNoGoodIndexUsed = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_NO_GOOD_INDEX_USED) !== 0;
    };

    OkResult.prototype.isNoIndexUsed = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_NO_INDEX_USED) !== 0;
    };

    OkResult.prototype.isCursorExists = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_CURSOR_EXISTS) !== 0;
    };

    OkResult.prototype.isLastRowSent = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_LAST_ROW_SENT) !== 0;
    };

    OkResult.prototype.isDbDropped = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_DB_DROPPED) !== 0;
    };

    OkResult.prototype.isNoBackslashEscapes = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_NO_BACKSLASH_ESCAPES) !== 0;
    };

    OkResult.prototype.isMetadataChanged = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_METADATA_CHANGED) !== 0;
    };

    OkResult.prototype.isQueryWasSlow = function() {
        return (this.statusFlags & StatusFlags.SERVER_QUERY_WAS_SLOW) !== 0;
    };

    OkResult.prototype.isPsOutParams = function() {
        return (this.statusFlags & StatusFlags.SERVER_PS_OUT_PARAMS) !== 0;
    };

    // Export

    MySQL.OkResult = OkResult;

})(MySQL.StatusFlags);

(function() {
    "use strict";

    // Constructor

    var ErrResult = function(newErrorCode,
                             newSqlStateMarker,
                             newSqlState,
                             newErrorMessage) {
        this.errorCode = newErrorCode;
        this.sqlStateMarker = newSqlStateMarker;
        this.sqlState = newSqlState;
        this.errorMessage = newErrorMessage;
    };

    // Public methods

    ErrResult.prototype.isSuccess = function() {
        return false;
    };

    // Export
    MySQL.ErrResult = ErrResult;

})();

(function() {
    "use strict";

    // Constructor

    var QueryResult = function(newColumnCount) {
        this.columnCount = newColumnCount;
    };

    // Public methods

    QueryResult.prototype.isSuccess = function() {
        return true;
    };

    QueryResult.prototype.hasResultset = function() {
        return true;
    };

    // Export

    MySQL.QueryResult = QueryResult;

})();

(function() {
    "use strict";

    // Constructor

    var FieldFlags = {
        NOT_NULL: 0x0001,
        PRIMARY_KEY: 0x0002,
        UNIQUE: 0x0004,
        INDEX: 0x0008,
        BLOB: 0x0010,
        UNSIGNED: 0x0020,
        ZEROFILL: 0x0040,
        BINARY: 0x0080,
        AUTO_INCREMENT: 0x0200,
        ENUM: 0x0100,
        SET: 0x0800,
        NO_DEFAULT_VALUE: 0x1000
    };

    // Export

    MySQL.FieldFlags = FieldFlags;

})();

(function(FieldFlags) {
    "use strict";

    // Constructor

    var ColumnDefinition = function(newCatalog,
                                    newSchema,
                                    newTable,
                                    newOrgtable,
                                    newName,
                                    newOrgname,
                                    newNextlength,
                                    newCharacterset,
                                    newColumnlength,
                                    newColumntype,
                                    newFlags,
                                    newDecimals) {
        this.catalog = newCatalog;
        this.schema = newSchema;
        this.table = newTable;
        this.orgTable = newOrgtable;
        this.name = newName;
        this.orgName = newOrgname;
        this.nextLength = newNextlength;
        this.characterSet = newCharacterset;
        this.columnLength = newColumnlength;
        this.columnType = newColumntype;
        this.flags = newFlags;
        this.decimals = newDecimals;
    };

    // Public methods

    ColumnDefinition.prototype.isNotNull = function() {
        return (this.flags & FieldFlags.NOT_NULL) !== 0;
    };

    ColumnDefinition.prototype.isPrimaryKey = function() {
        return (this.flags & FieldFlags.PRIMARY_KEY) !== 0;
    };

    ColumnDefinition.prototype.isUnique = function() {
        return (this.flags & FieldFlags.UNIQUE) !== 0;
    };

    ColumnDefinition.prototype.isIndex = function() {
        return (this.flags & FieldFlags.INDEX) !== 0;
    };

    ColumnDefinition.prototype.isBlob = function() {
        return (this.flags & FieldFlags.BLOB) !== 0;
    };

    ColumnDefinition.prototype.isUnsigned = function() {
        return (this.flags & FieldFlags.UNSIGNED) !== 0;
    };

    ColumnDefinition.prototype.isZeroFill = function() {
        return (this.flags & FieldFlags.ZEROFILL) !== 0;
    };

    ColumnDefinition.prototype.isBinary = function() {
        return (this.flags & FieldFlags.BINARY) !== 0;
    };

    ColumnDefinition.prototype.isAutoIncrement = function() {
        return (this.flags & FieldFlags.AUTO_INCREMENT) !== 0;
    };

    ColumnDefinition.prototype.isEnum = function() {
        return (this.flags & FieldFlags.ENUM) !== 0;
    };

    ColumnDefinition.prototype.isSet = function() {
        return (this.flags & FieldFlags.SET) !== 0;
    };

    ColumnDefinition.prototype.isNoDefaultValue = function() {
        return (this.flags & FieldFlags.NO_DEFAULT_VALUE) !== 0;
    };

    // Export

    MySQL.ColumnDefinition = ColumnDefinition;

})(MySQL.FieldFlags);

(function() {
    "use strict";

    // Constructor

    var ResultsetRow = function(newValues) {
        this.values = newValues;
    };

    // Export

    MySQL.ResultsetRow = ResultsetRow;

})();

(function(StatusFlags) {
    "use strict";

    // Constructor

    var EofResult = function(newWarningCount, newStatusFlags) {
        this.warningCount = newWarningCount;
        this.statusFlags = newStatusFlags;
    };

    // Public methods

    EofResult.prototype.isStatusInTrans = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_IN_TRANS) !== 0;
    };

    EofResult.prototype.isAutoCommit = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_AUTOCOMMIT) !== 0;
    };

    EofResult.prototype.isMoreResultsExists = function() {
        return (this.statusFlags & StatusFlags.SERVER_MORE_RESULTS_EXISTS) !== 0;
    };

    EofResult.prototype.isNoGoodIndexUsed = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_NO_GOOD_INDEX_USED) !== 0;
    };

    EofResult.prototype.isNoIndexUsed = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_NO_INDEX_USED) !== 0;
    };

    EofResult.prototype.isCursorExists = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_CURSOR_EXISTS) !== 0;
    };

    EofResult.prototype.isLastRowSent = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_LAST_ROW_SENT) !== 0;
    };

    EofResult.prototype.isDbDropped = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_DB_DROPPED) !== 0;
    };

    EofResult.prototype.isNoBackslashEscapes = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_NO_BACKSLASH_ESCAPES) !== 0;
    };

    EofResult.prototype.isMetadataChanged = function() {
        return (this.statusFlags & StatusFlags.SERVER_STATUS_METADATA_CHANGED) !== 0;
    };

    EofResult.prototype.isQueryWasSlow = function() {
        return (this.statusFlags & StatusFlags.SERVER_QUERY_WAS_SLOW) !== 0;
    };

    EofResult.prototype.isPsOutParams = function() {
        return (this.statusFlags & StatusFlags.SERVER_PS_OUT_PARAMS) !== 0;
    };

    // Export

    MySQL.EofResult = EofResult;

})(MySQL.StatusFlags);

(function() {
    "use strict";

    // Constructor

    var ColumnTypes = {
        DECIMAL: 0x00,
        TINY: 0x01,
        SHORT: 0x02,
        LONG: 0x03,
        FLOAT: 0x04,
        DOUBLE: 0x05,
        NULL: 0x06,
        TIMESTAMP: 0x07,
        LONGLONG: 0x08,
        INT24: 0x09,
        DATE: 0x0a,
        TIME: 0x0b,
        DATETIME: 0x0c,
        YEAR: 0x0d,
        VARCHAR: 0x0f,
        BIT: 0x10,
        NEWDECIMAL: 0xf6,
        ENUM: 0xf7,
        SET: 0xf8,
        TINY_BLOB: 0xf9,
        MEDIUM_BLOB: 0xfa,
        LONG_BLOB: 0xfb,
        BLOB: 0xfc,
        VAR_STRING: 0xfd,
        STRING: 0xfe,
        GEOMETRY: 0xff
    };

    // Export

    MySQL.ColumnTypes = ColumnTypes;

})();

(function(BinaryUtils,
          MySQLTypes,
          Hasher,
          QueryResult,
          OkResult,
          ErrResult,
          EofResult,
          InitialHandshakeRequest,
          ColumnDefinition,
          ResultsetRow) {
    "use strict";

    // Constructor

    var Protocol = function() {
        this.binaryUtils = new BinaryUtils();
        this.mySQLTypes = new MySQLTypes();
        this.hasher = new Hasher();
    };

    // Private methods

    var _createOkResult = function(data, offset, dataLength) {
        var affectedRowsResult = this.mySQLTypes.getLengthEncodedInteger(data, offset);
        var affectedRows = affectedRowsResult.result;
        var lastInsertIdResult =
                this.mySQLTypes.getLengthEncodedInteger(
                    data, affectedRowsResult.nextPosition);
        var lastInsertId = lastInsertIdResult.result;
        var statusFlags =
                this.mySQLTypes.getFixedLengthInteger(
                    data, lastInsertIdResult.nextPosition, 2);
        var warnings =
                this.mySQLTypes.getFixedLengthInteger(
                    data, lastInsertIdResult.nextPosition + 2, 2);
        var info = "";
        if (dataLength > lastInsertIdResult.nextPosition + 4) {
            var length = dataLength - lastInsertIdResult.nextPosition + 4;
            info = this.mySQLTypes.getFixedLengthString(
                data, lastInsertIdResult.nextPosition + 4, length);
        }
        return new OkResult(
            affectedRows, lastInsertId, statusFlags, warnings, info);
    };

    var _createErrResult = function(data, offset, dataLength) {
        var errorCode = this.mySQLTypes.getFixedLengthInteger(data, offset, 2);
        var sqlStateMarker = this.mySQLTypes.getFixedLengthString(data, offset + 2, 1);
        var sqlState = this.mySQLTypes.getFixedLengthString(data, offset + 3, 5);
        var errorMessageLength = dataLength - offset - 8;
        var errorMessage =
                this.mySQLTypes.getFixedLengthString(
                    data, offset + 8, errorMessageLength);
        return new ErrResult(errorCode, sqlStateMarker, sqlState, errorMessage);
    };

    // Public methods

    Protocol.prototype.generateStatisticsRequest = function() {
        var buffer = new ArrayBuffer(1);
        var array = new Uint8Array(buffer);
        array[0] = 0x09;
        return array;
    };

    Protocol.prototype.generateQueryRequest = function(queryString) {
        var buffer = this.binaryUtils.stringToArrayBuffer(queryString);
        var view = new Uint8Array(buffer);
        var array = this.binaryUtils.createUint8Array(1 + view.length);
        array[0] = 0x03;
        array.set(view, 1);
        return array;
    };

    Protocol.prototype.generateInitDBRequest = function(schemaName) {
        var schemaNameBuffer = this.binaryUtils.stringToArrayBuffer(schemaName);
        var schemaNameArray = new Uint8Array(schemaNameBuffer);
        var resultArray = this.binaryUtils.createUint8Array(1 + schemaNameArray.length);
        resultArray[0] = 0x02;
        resultArray.set(schemaNameArray, 1);
        return resultArray;
    };

    Protocol.prototype.generateSSLRequest = function(initialHandshakeRequest, multiStatements) {
        var capabilityFlagsValue =
                0x00001 // CLIENT_LONG_PASSWORD
              | 0x00200 // CLIENT_PROTOCOL_41
              | 0x00800 // CLIENT_SSL
              | 0x08000 // CLIENT_SECURE_CONNECTION
              | 0x80000; // CLIENT_PLUGIN_AUTH
        if (multiStatements) {
            capabilityFlagsValue |= 0x10000; // CLIENT_MULTI_STATEMENTS
            capabilityFlagsValue |= 0x20000; // CLIENT_MULTI_RESULTS
        }
        var capabilityFlags =
                this.mySQLTypes.createFixedLengthInteger(capabilityFlagsValue, 4);
        var maxPacketSize =
                this.mySQLTypes.createFixedLengthInteger(0xFFFFFF, 4); // About 16MB
        var characterSet =
                this.mySQLTypes.createLengthEncodedInteger(0x21); // utf8_general_ci
        var length =
                capabilityFlags.length +
                maxPacketSize.length +
                characterSet.length +
                23;
        var buffer = new ArrayBuffer(length);
        var array = new Uint8Array(buffer);
        var offset = 0;
        array.set(capabilityFlags, offset);
        offset += capabilityFlags.length;
        array.set(maxPacketSize, offset);
        offset += maxPacketSize.length;
        array.set(characterSet, offset);
        return array;
    };

    Protocol.prototype.generateHandshakeResponse = function(
        initialHandshakeRequest, username, passwordHash, multiStatements) {
        var capabilityFlagsValue =
                0x00001 // CLIENT_LONG_PASSWORD
              | 0x00200 // CLIENT_PROTOCOL_41
              | 0x08000 // CLIENT_SECURE_CONNECTION
              | 0x80000; // CLIENT_PLUGIN_AUTH
        if (multiStatements) {
            capabilityFlagsValue |= 0x10000; // CLIENT_MULTI_STATEMENTS
            capabilityFlagsValue |= 0x20000; // CLIENT_MULTI_RESULTS
        }
        var capabilityFlags =
                this.mySQLTypes.createFixedLengthInteger(capabilityFlagsValue, 4);
        var maxPacketSize =
                this.mySQLTypes.createFixedLengthInteger(0xFFFFFF, 4); // About 16MB
        var characterSet =
                this.mySQLTypes.createLengthEncodedInteger(0x21); // utf8_general_ci
        var usernameArray = this.mySQLTypes.createNullEndString(username);
        var passwordHashLength;
        if (passwordHash === null) {
            passwordHashLength = 0;
        } else {
            passwordHashLength =
                this.mySQLTypes.createLengthEncodedInteger(passwordHash.length);
        }
        var authPluginName =
                this.mySQLTypes.createNullEndString(initialHandshakeRequest.authPluginName);
        var length =
                capabilityFlags.length +
                maxPacketSize.length +
                characterSet.length +
                23 +
                usernameArray.length +
                authPluginName.length;
        if (passwordHash === null) {
            length += 1;
        } else {
            length += passwordHashLength.length + passwordHash.length;
        }
        var buffer = new ArrayBuffer(length);
        var array = new Uint8Array(buffer);
        var offset = 0;
        array.set(capabilityFlags, offset);
        offset += capabilityFlags.length;
        array.set(maxPacketSize, offset);
        offset += maxPacketSize.length;
        array.set(characterSet, offset);
        offset += characterSet.length;
        offset += 23;
        array.set(usernameArray, offset);
        offset += usernameArray.length;
        if (passwordHash === null) {
            array.set([0], offset);
            offset += 1;
        } else {
            array.set(passwordHashLength, offset);
            offset += passwordHashLength.length;
            array.set(passwordHash, offset);
            offset += passwordHash.length;
        }
        array.set(authPluginName, offset);
        return array;
    };

    Protocol.prototype.generatePasswordHash = function(
        initialHandshakeRequest, passwordString) {
        var password1Array = this.hasher.sha1ToUint8Array(passwordString);
        var password2Array = this.hasher.sha1Uint8ArrayToUint8Array(password1Array);
        var authPluginDataPart1 = initialHandshakeRequest.authPluginDataPart1;
        var authPluginDataPart2 = initialHandshakeRequest.authPluginDataPart2;
        var sourceBuffer = new ArrayBuffer(authPluginDataPart1.length +
                                           authPluginDataPart2.length +
                                           password2Array.length);
        var sourceView = new Uint8Array(sourceBuffer);
        sourceView.set(authPluginDataPart1, 0);
        sourceView.set(authPluginDataPart2, authPluginDataPart1.length);
        sourceView.set(password2Array,
                       authPluginDataPart1.length + authPluginDataPart2.length);
        var hashedSourceArray = this.hasher.sha1Uint8ArrayToUint8Array(sourceView);
        var result = new Uint8Array(password1Array.length);
        for (var i = 0; i < result.length; i++) {
            result[i] = password1Array[i] ^ hashedSourceArray[i];
        }
        return result;
    };

    Protocol.prototype.generatePingRequest = function() {
        var array = this.binaryUtils.createUint8Array(1);
        array[0] = 0x0e;
        return array;
    };

    Protocol.prototype.parseQueryResultPacket = function(packet, callback) {
        var data = packet.data;
        var header = this.mySQLTypes.getFixedLengthInteger(data, 0, 1);
        if (header === 0) {
            // No result set
            var okResult = _createOkResult.call(
                this, data, 1, packet.dataLength);
            callback(okResult);
        } else if (header == 0xFF) {
            // Error
            var errResult = _createErrResult.call(
                this, data, 1, packet.dataLength);
            callback(errResult);
        } else {
            // Result set exists
            var columnCountResult = this.mySQLTypes.getLengthEncodedInteger(data, 0);
            var queryResult = new QueryResult(columnCountResult.result);
            callback(queryResult);
        }
    };

    Protocol.prototype.parseOkErrResultPacket = function(packet) {
        var data = packet.data;
        var header = this.mySQLTypes.getFixedLengthInteger(data, 0, 1);
        if (header === 0) {
            // Succeeded
            return _createOkResult.call(
                this, data, 1, packet.dataLength);
        } else if (header == 0xFF) {
            // Error
            return _createErrResult.call(
                this, data, 1, packet.dataLength);
        } else {
            // TODO: Unknown
            return null;
        }
    };

    Protocol.prototype.parseEofPacket = function(packet) {
        var data = packet.data;
        var header = this.mySQLTypes.getFixedLengthInteger(data, 0, 1);
        if (header == 0xFE) {
            var warningCount = this.mySQLTypes.getFixedLengthInteger(data, 1, 2);
            var statusFlags = this.mySQLTypes.getFixedLengthInteger(data, 3, 2);
            return new EofResult(warningCount, statusFlags);
        } else {
            // TODO: Unknown
            return null;
        }
    };

    Protocol.prototype.parseInitialHandshakePacket = function(packet) {
        var data = packet.data;
        var offset = 0;
        var protocolVersion = this.mySQLTypes.getFixedLengthInteger(data, offset++, 1);
        var serverVersionResult = this.mySQLTypes.getNullEndString(data, offset);
        var serverVersion = serverVersionResult.result;
        offset = serverVersionResult.nextPosition;
        var connectionId = this.mySQLTypes.getFixedLengthInteger(data, offset, 4);
        offset += 4;
        var authPluginDataPart1 = new Uint8Array(data, offset, 8);
        offset += 8 + 1; // Skip 1 byte
        var capabilityFlag1 = this.mySQLTypes.getFixedLengthInteger(data, offset, 2);
        offset += 2;
        var characterSet = this.mySQLTypes.getFixedLengthInteger(data, offset++, 1);
        var statusFlags = this.mySQLTypes.getFixedLengthInteger(data, offset, 2);
        offset += 2;
        var capabilityFlag2 = this.mySQLTypes.getFixedLengthInteger(data, offset, 2);
        offset += 2;
        var authPluginDataLen = this.mySQLTypes.getFixedLengthInteger(data, offset++, 1);
        offset += 10; // Skip 10 bytes
        var authPluginDataPart2 = new Uint8Array(data, offset, 12);
        offset += 12 + 1; // Skip 1 byte
        var authPluginNameResult = this.mySQLTypes.getNullEndString(data, offset);
        var authPluginName = authPluginNameResult.result;
        return new InitialHandshakeRequest(protocolVersion,
                                           serverVersion,
                                           connectionId,
                                           authPluginDataPart1,
                                           capabilityFlag1,
                                           characterSet,
                                           statusFlags,
                                           capabilityFlag2,
                                           authPluginDataLen,
                                           authPluginDataPart2,
                                           authPluginName);
    };

    Protocol.prototype.parseColumnDefinitionPacket = function(packet) {
        var data = packet.data;
        var catalogResult = this.mySQLTypes.getLengthEncodedString(data, 0);
        var schemaResult = this.mySQLTypes.getLengthEncodedString(
            data, catalogResult.nextPosition);
        var tableResult = this.mySQLTypes.getLengthEncodedString(
            data, schemaResult.nextPosition);
        var orgTableResult = this.mySQLTypes.getLengthEncodedString(
            data, tableResult.nextPosition);
        var nameResult = this.mySQLTypes.getLengthEncodedString(
            data, orgTableResult.nextPosition);
        var orgNameResult = this.mySQLTypes.getLengthEncodedString(
            data, nameResult.nextPosition);
        var nextLengthResult = this.mySQLTypes.getLengthEncodedInteger(
            data, orgNameResult.nextPosition);
        var offset = nextLengthResult.nextPosition;
        var characterSet = this.mySQLTypes.getFixedLengthInteger(data, offset, 2);
        offset += 2;
        var columnLength = this.mySQLTypes.getFixedLengthInteger(data, offset, 4);
        offset += 4;
        var columnType = this.mySQLTypes.getFixedLengthInteger(data, offset, 1);
        offset += 1;
        var flags = this.mySQLTypes.getFixedLengthInteger(data, offset, 2);
        offset += 2;
        var decimals = this.mySQLTypes.getFixedLengthInteger(data, offset, 1);
        return new ColumnDefinition(catalogResult.result,
                                    schemaResult.result,
                                    tableResult.result,
                                    orgTableResult.result,
                                    nameResult.result,
                                    orgNameResult.result,
                                    nextLengthResult.result,
                                    characterSet,
                                    columnLength,
                                    columnType,
                                    flags,
                                    decimals);
    };

    Protocol.prototype.parseResultsetRowPacket = function(packet) {
        var data = packet.data;
        var offset = 0;
        var values = [];
        while(offset < packet.dataLength) {
            var valueResult = this.mySQLTypes.getLengthEncodedString(data, offset);
            values.push(valueResult.result);
            offset = valueResult.nextPosition;
        }
        return new ResultsetRow(values);
    };

    Protocol.prototype.parseStatisticsResultPacket = function(packet) {
        var data = packet.data;
        var dataLength = packet.dataLength;
        var result = this.mySQLTypes.getFixedLengthString(data, 0, dataLength);
        return result;
    };

    // Export

    MySQL.Protocol = Protocol;

})(MySQL.BinaryUtils,
   MySQL.Types,
   MySQL.Hasher,
   MySQL.QueryResult,
   MySQL.OkResult,
   MySQL.ErrResult,
   MySQL.EofResult,
   MySQL.InitialHandshakeRequest,
   MySQL.ColumnDefinition,
   MySQL.ResultsetRow);

(function(Packet, MySQLTypes) {
    "use strict";

    // Constructor

    var Communication = function() {
        this.mySQLTypes = new MySQLTypes();
        this.nextSequenceNumber = 0;
        this.socketImpl = null;
    };

    // Private Methods

    var _readPluralPackets = function(
        current, count, result, callback, fatalCallback) {
        this.readPacket(function(packet) {
            result.push(packet);
            current += 1;
            if (current < count) {
                _readPluralPackets.call(
                    this, current, count, result, callback, fatalCallback);
            } else {
                callback(result);
            }
        }.bind(this), fatalCallback);
    };

    var _readFixedLongValue = function(length, callback, fatalCallback) {
        _read.call(this, length, function(readInfo) {
            var result = this.mySQLTypes.getFixedLengthInteger(readInfo.data, 0, length);
            callback(result);
        }.bind(this), fatalCallback);
    };

    var _read = function(length, callback, fatalCallback) {
        this.socketImpl.read(length, callback, fatalCallback);
    };

    // Public Methods

    Communication.prototype.setSocketImpl = function(impl) {
        this.socketImpl = impl;
    };

    Communication.prototype.connect = function(host, port, callback) {
        this.socketImpl.connect(host, port, callback);
    };

    Communication.prototype.disconnect = function(callback) {
        this.socketImpl.disconnect(callback);
    };

    Communication.prototype.isConnected = function() {
        return this.socketImpl.isConnected();
    };

    Communication.prototype.readPacket = function(callback, fatalCallback) {
        _readFixedLongValue.call(this, 3, function(dataLength) {
            _readFixedLongValue.call(this, 1, function(sequenceNumber) {
                this.incrementSequenceNumber(sequenceNumber);
                _read.call(this, dataLength, function(readInfo) {
                    var packet = new Packet(sequenceNumber, readInfo.data);
                    callback(packet);
                }.bind(this), fatalCallback);
            }.bind(this), fatalCallback);
        }.bind(this), fatalCallback);
    };

    Communication.prototype.readPluralPackets = function(
        count, callback, fatalCallback) {
        _readPluralPackets.call(this, 0, count, [], callback, fatalCallback);
    };

    Communication.prototype.writePacket = function(packet, callback, errorCallback) {
        this.socketImpl.write(packet, callback, errorCallback);
    };

    Communication.prototype.incrementSequenceNumber = function(sequenceNumber) {
        this.nextSequenceNumber = sequenceNumber + 1;
        if (this.nextSequenceNumber > 255) {
            this.nextSequenceNumber = 0;
        }
    };

    Communication.prototype.createPacket = function(buffer) {
        return new Packet(this.nextSequenceNumber, buffer);
    };

    Communication.prototype.resetSequenceNumber = function() {
        this.nextSequenceNumber = 0;
    };

    Communication.prototype.establishTls = function(ca, checkCN, callback, fatalCallback) {
        this.socketImpl.establishTls(ca, checkCN, callback, fatalCallback);
    };

    // Export

    MySQL.Communication = Communication;


})(MySQL.Packet, MySQL.Types);

(function(MySQLCommunication, MySQLProtocol, NetworkErrorCode) {
    "use strict";

    // Constructor

    var Client = function() {
        this.mySQLCommunication = new MySQLCommunication();
        this.mySQLProtocol = new MySQLProtocol();
        this.networkErrorCode = new NetworkErrorCode();
    };

    // Private methods

    var _handshake = function(username, password, multiStatements, callback, fatalCallback) {
        this.mySQLCommunication.readPacket(function(packet) {
            var initialHandshakeRequest =
                    this.mySQLProtocol.parseInitialHandshakePacket(packet);
            _sendHandshakeResponse.call(
                this, initialHandshakeRequest, username, password, multiStatements,
                callback, fatalCallback);
        }.bind(this), fatalCallback);
    };

    var _sendHandshakeResponse = function(initialHandshakeRequest, username, password, multiStatements, callback, fatalCallback) {
        var passwordHash;
        if (password) {
            passwordHash =
                this.mySQLProtocol.generatePasswordHash(
                    initialHandshakeRequest, password);
        } else {
            passwordHash = null;
        }
        var handshakeResponse =
                this.mySQLProtocol.generateHandshakeResponse(
                    initialHandshakeRequest, username, passwordHash, multiStatements);
        var handshakeResponsePacket =
                this.mySQLCommunication.createPacket(handshakeResponse.buffer);
        this.mySQLCommunication.writePacket(handshakeResponsePacket, function(writeInfo) {
            this.mySQLCommunication.readPacket(function(packet) {
                var result = this.mySQLProtocol.parseOkErrResultPacket(packet);
                callback(initialHandshakeRequest, result);
            }.bind(this), fatalCallback);
        }.bind(this), fatalCallback);
    };

    var _handshakeWithSSL = function(ca, checkCN, username, password, multiStatements, callback, fatalCallback) {
        this.mySQLCommunication.readPacket(function(packet) {
            var initialHandshakeRequest =
                    this.mySQLProtocol.parseInitialHandshakePacket(packet);
            var connectWithSSLRequest =
                    this.mySQLProtocol.generateSSLRequest(initialHandshakeRequest, multiStatements);
            var connectWithSSLRequestPacket =
                    this.mySQLCommunication.createPacket(connectWithSSLRequest.buffer);
            this.mySQLCommunication.writePacket(connectWithSSLRequestPacket, function(writeInfo) {
                this.mySQLCommunication.establishTls(ca, checkCN, function() {
                    this.mySQLCommunication.incrementSequenceNumber(
                        connectWithSSLRequestPacket.sequenceNumber);
                    _sendHandshakeResponse.call(
                        this, initialHandshakeRequest, username, password, multiStatements,
                        callback, fatalCallback);
                }.bind(this), fatalCallback);
            }.bind(this), fatalCallback);
        }.bind(this), fatalCallback);
    };

    var _readResultsetRows = function(result, callback, errorCallback, fatalCallback) {
        this.mySQLCommunication.readPacket(function(packet) {
            var eofResult = this.mySQLProtocol.parseEofPacket(packet);
            var errResult = this.mySQLProtocol.parseOkErrResultPacket(packet);
            if (eofResult) {
                callback(result, eofResult);
            } else if (errResult && !errResult.isSuccess()) {
                errorCallback(errResult);
            } else {
                var row = this.mySQLProtocol.parseResultsetRowPacket(packet);
                result.push(row);
                _readResultsetRows.call(this, result, callback, errorCallback, fatalCallback);
            }
        }.bind(this), fatalCallback);
    };

    var _readColumnDefinitions = function(columnCount, resultsetCallback,
                                          noResultsetCallback, errorCallback,
                                          fatalCallback) {
        this.mySQLCommunication.readPluralPackets(columnCount, function(packets) {
            var columnDefinitions = [];
            for (var i = 0; i < packets.length; i++) {
                columnDefinitions.push(
                    this.mySQLProtocol.parseColumnDefinitionPacket(
                        packets[i]));
            }
            this.mySQLCommunication.readPacket(function(packet) {
                this.mySQLProtocol.parseEofPacket(packet);
                _readResultsetRows.call(this, [], function(resultsetRows, eofResult) {
                    resultsetCallback(columnDefinitions, resultsetRows, eofResult);
                }.bind(this), errorCallback, fatalCallback);
            }.bind(this), fatalCallback);
        }.bind(this), fatalCallback);
    };

    var _readQueryResult = function(resultsetCallback, noResultsetCallback,
                                    errorCallback, fatalCallback) {
        this.mySQLCommunication.readPacket(function(packet) {
            this.mySQLProtocol.parseQueryResultPacket(packet, function(result) {
                if (result.isSuccess() && result.hasResultset()) {
                    var columnCount = result.columnCount;
                    _readColumnDefinitions.call(
                        this, columnCount, resultsetCallback, noResultsetCallback,
                        errorCallback, fatalCallback);
                } else if (result.isSuccess() && !result.hasResultset()) {
                    noResultsetCallback(result);
                } else {
                    errorCallback(result);
                }
            }.bind(this));
        }.bind(this), fatalCallback);
    };

    var _sendQueryRequest = function(queryString, resultsetCallback,
                                     noResultsetCallback,
                                     errorCallback, fatalCallback) {
        var queryRequest = this.mySQLProtocol.generateQueryRequest(queryString);
        var queryPacket = this.mySQLCommunication.createPacket(queryRequest.buffer);
        this.mySQLCommunication.writePacket(queryPacket, function(writeInfo) {
            _readQueryResult.call(this, resultsetCallback, noResultsetCallback,
                             errorCallback, fatalCallback);
        }.bind(this), fatalCallback);
    };

    // Public methods

    Client.prototype.setSocketImpl = function(impl) {
        this.mySQLCommunication.setSocketImpl(impl);
    };

    Client.prototype.login = function(host, port, username, password, multiStatements,
                                      callback, errorCallback, fatalCallback) {
        this.mySQLCommunication.connect(host, port, function(result) {
            if (result >= 0) {
                _handshake.call(this, username, password, multiStatements, callback, fatalCallback);
            } else {
                errorCallback(result + "(" +
                              this.networkErrorCode.getErrorMessage(result) + ")");
            }
        }.bind(this));
    };

    Client.prototype.loginWithSSL = function(host, port, username, password, multiStatements,
                                             ca, checkCN,
                                             callback, errorCallback, fatalCallback) {
        this.mySQLCommunication.connect(host, port, function(result) {
            if (result >= 0) {
                _handshakeWithSSL.call(this, ca, checkCN, username, password, multiStatements, callback, fatalCallback);
            } else {
                errorCallback(result + "(" +
                              this.networkErrorCode.getErrorMessage(result) + ")");
            }
        }.bind(this));
    };

    Client.prototype.logout = function(callback) {
        this.mySQLCommunication.disconnect(callback);
    };

    Client.prototype.query = function(queryString, resultsetCallback,
                                      noResultsetCallback,
                                      errorCallback, fatalCallback) {
        if (!this.mySQLCommunication.isConnected()) {
            fatalCallback("Not connected.");
            return;
        }
        this.mySQLCommunication.resetSequenceNumber();
        _sendQueryRequest.call(this,
                               queryString, resultsetCallback, noResultsetCallback,
                               errorCallback, fatalCallback);
    };

    Client.prototype.getNextQueryResult = function(resultsetCallback,
                                                     noResultsetCallback,
                                                     errorCallback, fatalCallback) {
        if (!this.mySQLCommunication.isConnected()) {
            fatalCallback("Not connected.");
            return;
        }
        _readQueryResult.call(this,
                              resultsetCallback, noResultsetCallback,
                              errorCallback, fatalCallback);
    };

    Client.prototype.getDatabases = function(callback, errorCallback, fatalCallback) {
        if (!this.mySQLCommunication.isConnected()) {
            fatalCallback("Not connected.");
            return;
        }
        this.query("SHOW DATABASES", function(columnDefinitions, resultsetRows) {
            var databases = [];
            for (var i = 0; i < resultsetRows.length; i++) {
                databases.push(resultsetRows[i].values[0]);
            }
            callback(databases);
        }.bind(this), function(result) {
            console.log("This callback function never be called.");
        }.bind(this), function(result) {
            errorCallback(result);
        }.bind(this), fatalCallback);
    };

    Client.prototype.initDB = function(schemaName, callback, fatalCallback) {
        if (!this.mySQLCommunication.isConnected()) {
            fatalCallback("Not connected.");
            return;
        }
        this.mySQLCommunication.resetSequenceNumber();
        var initDBRequest = this.mySQLProtocol.generateInitDBRequest(schemaName);
        var initDBPacket = this.mySQLCommunication.createPacket(initDBRequest.buffer);
        this.mySQLCommunication.writePacket(initDBPacket, function(writeInfo) {
            this.mySQLCommunication.readPacket(function(packet) {
                var result = this.mySQLProtocol.parseOkErrResultPacket(packet);
                callback(result);
            }.bind(this), fatalCallback);
        }.bind(this), fatalCallback);
    };

    Client.prototype.getStatistics = function(callback, fatalCallback) {
        if (!this.mySQLCommunication.isConnected()) {
            fatalCallback("Not connected.");
            return;
        }
        this.mySQLCommunication.resetSequenceNumber();
        var statisticsRequest = this.mySQLProtocol.generateStatisticsRequest();
        var statisticsPacket = this.mySQLCommunication.createPacket(statisticsRequest);
        this.mySQLCommunication.writePacket(statisticsPacket, function(writeInfo) {
            this.mySQLCommunication.readPacket(function(packet) {
                var statistics = this.mySQLProtocol.parseStatisticsResultPacket(packet);
                callback(statistics);
            }.bind(this), fatalCallback);
        }.bind(this), fatalCallback);
    };

    Client.prototype.ping = function(callback, fatalCallback) {
        if (!this.mySQLCommunication.isConnected()) {
            fatalCallback("Not connected.");
            return;
        }
        this.mySQLCommunication.resetSequenceNumber();
        var pingRequest = this.mySQLProtocol.generatePingRequest();
        var pingPacket = this.mySQLCommunication.createPacket(pingRequest);
        this.mySQLCommunication.writePacket(pingPacket, function(writeInfo) {
            this.mySQLCommunication.readPacket(function(packet) {
                var result = this.mySQLProtocol.parseOkErrResultPacket(packet);
                callback(result);
            }.bind(this), fatalCallback);
        }.bind(this), fatalCallback);
    };

    Client.prototype.isConnected = function() {
        return this.mySQLCommunication.isConnected();
    };

    // Export

    MySQL.Client = Client;

})(MySQL.Communication, MySQL.Protocol, MySQL.NetworkErrorCode);

(function() {

    // Constructor

    var ChromeSocket = function() {
        console.log("Deprecated: You should use MySQL.ChromeSocket2.");
        this.socketId = null;
    };

    // Public methods

    ChromeSocket.prototype.connect = function(host, port, callback) {
        var id = null;
        chrome.socket.create("tcp", {}, function(createInfo) {
            id = createInfo.socketId;
            chrome.socket.connect(
                id, host, port, function(result) {
                    if (result >= 0) {
                        this.socketId = id;
                    } else {
                        this.socketId = null;
                    }
                    callback(result);
                }.bind(this));
        }.bind(this));
    };

    ChromeSocket.prototype.isConnected = function() {
        return this.socketId !== null;
    };

    ChromeSocket.prototype.disconnect = function(callback) {
        if (this.socketId) {
            chrome.socket.disconnect(this.socketId);
            chrome.socket.destroy(this.socketId);
        }
        this.socketId = null;
        if (callback) {
            callback();
        }
    };

    ChromeSocket.prototype.write = function(packet, callback, errorCallback) {
        chrome.socket.write(this.socketId, packet.getArrayBuffer(), function(writeInfo) {
            var bytesWritten = writeInfo.bytesWritten;
            if (bytesWritten > 0) {
                callback(writeInfo);
            } else {
                console.log("Error: writeInfo.bytesWritten=" + bytesWritten);
                errorCallback("Sending packet failed: " + bytesWritten);
            }
        }.bind(this));
    };

    ChromeSocket.prototype.read = function(length, callback, fatalCallback) {
        chrome.socket.read(this.socketId, length, function(readInfo) {
            var resultCode = readInfo.resultCode;
            if (resultCode > 0) {
                callback(readInfo);
            } else {
                console.log("Error: readInfo.resultCode=" + resultCode +
                            " data=" + readInfo.data);
                fatalCallback("Reading packet failed: " + resultCode);
            }
        }.bind(this));
    };

    // Export

    MySQL.ChromeSocket = ChromeSocket;

})();

(function() {

    // Constructor

    var ChromeSocket2 = function() {
        this.socketId = null;
        this.initialize();
        this.callbacks = [];
        this.buffer = new ArrayBuffer(0);
        _resetTls.call(this);
        this.host = null;
        this.ca = null;
        this.checkCommonName = false;
    };

    // Private methods

    var _resetTls = function() {
        this.tlsRequiredByteLength = 0;
        this.tlsBuffer = "";
        this.tls = {
            open: false
        };
        this.tlsSendCallback = null;
        this.tlsSendErrorCallback = null;
    };

    var _appendReceivedData = function(received) {
        var newSize = this.buffer.byteLength + received.byteLength;
        var newBuffer = new ArrayBuffer(newSize);
        var newBufferView = new Uint8Array(newBuffer, 0, newSize);
        newBufferView.set(new Uint8Array(this.buffer, 0, this.buffer.byteLength), 0);
        newBufferView.set(new Uint8Array(received, 0, received.byteLength),
                          this.buffer.byteLength);
        this.buffer = newBuffer;
        this.fetch();
    };

    var _string2ArrayBuffer = function(string, callback) {
        var buf = new ArrayBuffer(string.length);
        var bufView = new Uint8Array(buf);
        for (var i=0; i < string.length; i++) {
            bufView[i] = string.charCodeAt(i);
        }
        callback(buf);
    };

    var _arrayBuffer2String = function(buf, callback) {
        var bufView = new Uint8Array(buf);
        var chunkSize = 65536;
        var result = '';
        for (var i = 0; i < bufView.length; i += chunkSize) {
            result += String.fromCharCode.apply(
                null, bufView.subarray(i, Math.min(i + chunkSize, bufView.length)));
        }
        callback(result);
    };

    var _receiveTlsData = function(received) {
        _arrayBuffer2String.call(this, received, function(data) {
            this.tlsBuffer += data;
            if (this.tlsBuffer.length >= this.tlsRequiredByteLength) {
                this.tlsRequiredByteLength = this.tls.process(this.tlsBuffer);
                this.tlsBuffer = "";
            }
        }.bind(this));
    };

    var _doSend = function(buffer, callback, errorCallback) {
        chrome.sockets.tcp.send(this.socketId, buffer, function(sendInfo) {
            var resultCode = sendInfo.resultCode;
            if (resultCode === 0) {
                callback(sendInfo);
            } else {
                console.log("Error: writeInfo.resultCode=" + resultCode);
                errorCallback("Sending data failed: " + resultCode);
            }
        }.bind(this));
    };

    var _outputArrayBuffer = function(buffer) {
        var array = new Uint8Array(buffer);
        var out = "";
        for (var i = 0; i < array.length; i++) {
            out += String.fromCharCode(array[i]);
        }
        console.log(out);
    };

    // Public methods

    ChromeSocket2.prototype.initialize = function() {
        chrome.sockets.tcp.onReceive.addListener(function(info) {
            if (this.socketId === info.socketId) {
                this.onReceive(info);
            }
        }.bind(this));
        chrome.sockets.tcp.onReceiveError.addListener(function(info) {
            if (this.socketId === info.socketId) {
                this.onReceiveError(info);
            }
        }.bind(this));
    };

    ChromeSocket2.prototype.onReceive = function(info) {
        var received = info.data;
        if (this.tls.open) {
            _receiveTlsData.call(this, received);
        } else {
            _appendReceivedData.call(this, received);
        }
    };

    ChromeSocket2.prototype.onReceiveError = function(info) {
        this.raiseError(info);
    };

    ChromeSocket2.prototype.raiseError = function(info) {
        if (this.callbacks.length > 0) {
            var data = this.callbacks[0];
            data.fatalCallback("Network error occurred: " + info.resultCode);
            // Delete callback info
            this.callbacks = this.callbacks.slice(1);
        }
    };

    ChromeSocket2.prototype.fetch = function() {
        if (this.callbacks.length > 0) {
            var data = this.callbacks[0];
            var resultBuffer, resultBufferArray, bufferArray, result;
            if (data.length > 0) {
                if (this.buffer.byteLength >= data.length) {
                    // Fetch result buffer
                    resultBuffer = new ArrayBuffer(data.length);
                    resultBufferArray = new Uint8Array(resultBuffer, 0, resultBuffer.byteLength);
                    bufferArray = new Uint8Array(this.buffer, 0, this.buffer.byteLength);
                    resultBufferArray.set(bufferArray.subarray(0, data.length));
                    // Delete read bytes
                    var newBuffer = new ArrayBuffer(this.buffer.byteLength - data.length);
                    var newArray = new Uint8Array(newBuffer, 0, newBuffer.byteLength);

                    newArray.set(bufferArray.subarray(data.length, bufferArray.byteLength), 0);
                    this.buffer = newBuffer;
                    // Delete callback info
                    this.callbacks = this.callbacks.slice(1);
                    // Make result
                    result = {
                        resultCode: 0,
                        data: resultBuffer
                    };
                    data.callback(result);
                    // Recursible
                    this.fetch();
                }
            } else if (data.length === -1) {
                // Fetch result buffer
                resultBuffer = new ArrayBuffer(this.buffer.byteLength);
                resultBufferArray = new Uint8Array(resultBuffer, 0, resultBuffer.byteLength);
                bufferArray = new Uint8Array(this.buffer, 0, this.buffer.byteLength);
                resultBufferArray.set(bufferArray.subarray(0, this.buffer.byteLength));
                // Delete read bytes
                this.buffer = new ArrayBuffer(0);
                // Delete callback info
                this.callbacks = this.callbacks.slice(1);
                // Make result
                result = {
                    resultCode: 0,
                    data: resultBuffer
                };
                data.callback(result);
                // Recursible
                this.fetch();
            } else {
                console.log("Invalid data.length: " + data.length);
            }
        }
    };

    ChromeSocket2.prototype.connect = function(host, port, callback) {
        var id = null;
        chrome.sockets.tcp.create({
            bufferSize: 0xFFFFFF
        }, function(createInfo) {
            id = createInfo.socketId;
            chrome.sockets.tcp.connect(
                id, host, port, function(result) {
                    if (result >= 0) {
                        this.socketId = id;
                        this.host = host;
                    } else {
                        this.socketId = null;
                        this.host = null;
                    }
                    this.ca = null;
                    callback(result);
                }.bind(this));
        }.bind(this));
    };

    ChromeSocket2.prototype.isConnected = function() {
        return this.socketId !== null;
    };

    ChromeSocket2.prototype.disconnect = function(callback) {
        if (this.socketId) {
            if (this.tls.open) {
                this.tls.close();
            }
            chrome.sockets.tcp.disconnect(this.socketId);
            chrome.sockets.tcp.close(this.socketId);
        }
        this.socketId = null;
        this.host = null;
        this.ca = null;
        this.callbacks = [];
        this.buffer = new ArrayBuffer(0);
        _resetTls.call(this);
        if (callback) {
            callback();
        }
    };

    ChromeSocket2.prototype.write = function(packet, callback, errorCallback) {
        if (this.tls.open) {
            _arrayBuffer2String.call(this, packet.getArrayBuffer(), function(data) {
                this.tlsSendCallback = callback;
                this.tlsSendErrorCallback = errorCallback;
                this.tls.prepare(data);
            }.bind(this));
        } else {
            _doSend.call(this, packet.getArrayBuffer(), callback, errorCallback);
        }
    };

    ChromeSocket2.prototype.read = function(length, callback, fatalCallback) {
        this.callbacks.push({
            length: length,
            callback: callback,
            fatalCallback: fatalCallback
        });
    };

    ChromeSocket2.prototype.establishTls = function(ca, checkCN, callback, fatalCallback) {
        this.ca = ca;
        this.checkCommonName = checkCN;
        _initializeTls.call(this, callback, fatalCallback);
        chrome.sockets.tcp.setPaused(this.socketId, true, function() {
            this.tls.handshake();
            chrome.sockets.tcp.setPaused(this.socketId, false);
        }.bind(this));
    };

    var _verify = function(c, verified, depth, certs) {
        if (!(certs && certs[0])) {
            return false;
        }
        if (!_verifyCertificate.call(this, certs[0], this.host)) {
            return false;
        }
        if (!this.ca) {
            return true;
        }
        var caObj = forge.pki.certificateFromPem(this.ca);
        if (!_verifyCertificate.call(this, caObj, this.host)) {
            return false;
        }
        if (caObj.verify(certs[0])) {
            return true;
        }
        var fingerprint1 = forge.pki.getPublicKeyFingerprint(caObj.publicKey, {
            encoding: 'hex'
        });
        var fingerprint2 = forge.pki.getPublicKeyFingerprint(certs[0].publicKey, {
            encoding: 'hex'
        });
        if (fingerprint1 === fingerprint2) {
            return true;
        }
        return false;
    };

    var _verifyCertificate = function(cert, host) {
        var cn = cert.subject.getField("CN");
        if (cn && cn.value) {
            if (_matchHost.call(this, cn, host)) {
                return true;
            }
        }
        var subjectAltName = cert.getExtension({
            name: "subjectAltName"
        });
        if (!(subjectAltName && subjectAltName.altNames)) {
            return false;
        }
        var altNames = subjectAltName.altNames;
        for (var i = altNames.length - 1; i >= 0; i--) {
            if (altNames[i] && altNames[i].value) {
                if (_matchHost.call(this, altNames[i], host)) {
                    return true;
                }
            }
        }
        return false;
    };

    var _matchHost = function(pattern, host) {
        if (this.checkCommonName) {
            var regexp = new RegExp(pattern.value.replace(/\./g, "\\.").replace(/\*/g, ".*"), "i");
            return regexp.test(host);
        } else {
            return true;
        }
    };

    var _initializeTls = function(callback, fatalCallback) {
        this.tls = forge.tls.createConnection({
            server: false,
            sessionId: null,
            caStore: [],
            sessionCache: null,
            cipherSuites: [
                forge.tls.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA,
                forge.tls.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA],
            virtualHost: null,
            verify: function(c, verified, depth, certs) {
                return _verify.call(this, c, verified, depth, certs);
            }.bind(this),
            getCertificate: null,
            getPrivateKey: null,
            getSignature: null,
            deflate: null,
            inflate: null,
            connected: function(c) {
                callback();
            },
            tlsDataReady: function(c) {
                var bytes = c.tlsData.getBytes();
                if (bytes.length > 0) {
                    _string2ArrayBuffer.call(this, bytes, function(data) {
                        _doSend.call(this, data, function(sendInfo) {
                            var targetCallback = this.tlsSendCallback;
                            this.tlsSendCallback = null;
                            if (targetCallback) {
                                targetCallback(sendInfo);
                            }
                        }.bind(this), function(reason) {
                            var targetCallback = this.tlsSendErrorCallback;
                            this.tlsSendErrorCallback = null;
                            if (targetCallback) {
                                targetCallback(reason);
                            }
                        }.bind(this));
                    }.bind(this));
                }
            }.bind(this),
            dataReady: function(c) {
                _string2ArrayBuffer.call(this, c.data.getBytes(), function(received) {
                    _appendReceivedData.call(this, received);
                }.bind(this));
            }.bind(this),
            closed: function(c) {
                // N/A
            }.bind(this),
            error: function(c, e) {
                console.log(e);
                fatalCallback(e.message);
            }.bind(this)
        });
    };

    // Export

    MySQL.ChromeSocket2 = ChromeSocket2;

})();

(function() {
    "use strict";

    // Constructor

    var ParseError = function(message) {
        this.message = message;
    };

    ParseError.prototype = new Error();

    ParseError.prototype.name = "ParseError";

    // Export

    MySQL.ParseError = ParseError;

})();

(function(ParseError) {

    var DEBUG = false;
    var DELIMITER = "delimiter ";

    // Constructor

    var QueryDivider = function() {
        this.result = [];
        this.stateMap = {
            query: this.query.bind(this),
            lineStart: this.lineStart.bind(this),
            escapedQuery: this.escapedQuery.bind(this),
            sharpComment: this.sharpComment.bind(this),
            maybeDashComment: this.maybeDashComment.bind(this),
            dashComment: this.dashComment.bind(this),
            maybeInlineCommentStart: this.maybeInlineCommentStart.bind(this),
            inlineComment: this.inlineComment.bind(this),
            maybeInlineCommentEnd: this.maybeInlineCommentEnd.bind(this),
            maybeDelimiterDef: this.maybeDelimiterDef.bind(this),
            delimiterDef: this.delimiterDef.bind(this),
            delimiterDefEnd: this.delimiterDefEnd.bind(this),
            maybeDelimiter: this.maybeDelimiter.bind(this),
            singleStringLeteral: this.singleStringLeteral.bind(this),
            escapedSingleStringLeteral: this.escapedSingleStringLeteral.bind(this),
            maybeSingleStringLeteralEnd: this.maybeSingleStringLeteralEnd.bind(this),
            doubleStringLeteral: this.doubleStringLeteral.bind(this),
            escapedDoubleStringLeteral: this.escapedDoubleStringLeteral.bind(this),
            maybeDoubleStringLeteralEnd: this.maybeDoubleStringLeteralEnd.bind(this)
        };
        this.currentState = this.stateMap.lineStart;
        this.buffer = [];
        this.maybeDashCommentCount = 0;
        this.maybeDelimiterDefBuffer = [];
        this.maybeDelimiterDefCount = 0;
        this.delimiterDefCandidate = [];
        this.delimiter = ";";
        this.maybeDelimiterCount = 0;
        this.skipDelimiterCheck = false;
    };

    // Private methods

    var _appendBufferToResult = function() {
        var joined = this.buffer.join("");
        var candidate = _trim.call(this, joined);
        if (candidate) {
            this.result.push(joined);
        }
        this.buffer = [];
    };

    var _trim = function(str) {
        return str.replace(/^[ 　\t\r\n]+|[ 　\t\r\n]+$/g, "");
    };

    // Public methods

    QueryDivider.prototype.parse = function(query) {
        try {
            this.evaluate(query);
            _appendBufferToResult.call(this);
            this.result[this.result.length - 1] += this.maybeDelimiterDefBuffer.join("");
            return {
                success: true,
                result: this.result
            };
        } catch(e) {
            if (e instanceof ParseError) {
                return {
                    success: false,
                    error: e
                };
            } else {
                throw e;
            }
        }
    };

    QueryDivider.prototype.evaluate = function(query) {
        var pos = 0;
        while(pos < query.length) {
            var ch = query.charAt(pos);
            var incr = this.currentState(query, ch, pos);
            pos += incr;
        }
    };

    QueryDivider.prototype.lineStart = function(query, ch, pos) {
        if (DEBUG) {
            console.log("lineStart: " + ch);
        }
        if (ch === ' ') {
            this.buffer.push(ch);
            return 1;
        } else if (ch === 'd' || ch === 'D') {
            this.currentState = this.stateMap.maybeDelimiterDef;
            this.maybeDelimiterDefBuffer = [ch];
            this.maybeDelimiterDefCount = 0;
            return 1;
        } else {
            this.currentState = this.stateMap.query;
            return 0;
        }
    };

    QueryDivider.prototype.query = function(query, ch, pos) {
        if (DEBUG) {
            console.log("query: " + ch + " [delimiter=" + this.delimiter + "]");
        }
        var skipDelimiterCheck = this.skipDelimiterCheck;
        this.skipDelimiterCheck = false;
        if (ch === '\\') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.escapedQuery;
            return 1;
        } else if (!skipDelimiterCheck && ch === this.delimiter.charAt(0) && this.delimiter.length === 1) {
            _appendBufferToResult.call(this);
            return 1;
        } else if (!skipDelimiterCheck && ch === this.delimiter.charAt(0)) {
            this.currentState = this.stateMap.maybeDelimiter;
            this.maybeDelimiterCount = 0;
            return 1;
        } else if (ch === '#') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.sharpComment;
            return 1;
        } else if (ch === '-') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.maybeDashComment;
            this.maybeDashCommentCount = 0;
            return 1;
        } else if (ch === '/') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.maybeInlineCommentStart;
            return 1;
        } else if (ch === '\n') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.lineStart;
            return 1;
        } else if (ch === '\'') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.singleStringLeteral;
            return 1;
        } else if (ch === '"') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.doubleStringLeteral;
            return 1;
        } else {
            this.buffer.push(ch);
            return 1;
        }
    };

    QueryDivider.prototype.escapedQuery = function(query, ch, pos) {
        if (DEBUG) {
            console.log("escapedQuery: " + ch);
        }
        this.buffer.push(ch);
        this.currentState = this.stateMap.query;
        return 1;
    };

    QueryDivider.prototype.sharpComment = function(query, ch, pos) {
        if (DEBUG) {
            console.log("sharpComment: " + ch);
        }
        if (ch === '\n') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.lineStart;
            return 1;
        } else {
            this.buffer.push(ch);
            return 1;
        }
    };

    QueryDivider.prototype.maybeDashComment = function(query, ch, pos) {
        if (DEBUG) {
            console.log("maybeDashComment: " + ch);
        }
        if (this.maybeDashCommentCount === 0 && ch === '-') {
            this.buffer.push(ch);
            this.maybeDashCommentCount++;
            return 1;
        } else if (this.maybeDashCommentCount === 1 && ch === ' ') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.dashComment;
            return 1;
        } else if (this.maybeDashCommentCount === 1 && ch === '\n') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.lineStart;
            return 1;
        } else {
            this.buffer.push(ch);
            this.currentState = this.stateMap.query;
            return 1;
        }
    };

    QueryDivider.prototype.dashComment = function(query, ch, pos) {
        if (DEBUG) {
            console.log("dashComment: " + ch);
        }
        if (ch === '\n') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.lineStart;
            return 1;
        } else {
            this.buffer.push(ch);
            return 1;
        }
    };

    QueryDivider.prototype.maybeInlineCommentStart = function(query, ch, pos) {
        if (DEBUG) {
            console.log("maybeInlineCommentStart: " + ch);
        }
        if (ch === '*') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.inlineComment;
            return 1;
        } else {
            this.buffer.push(ch);
            this.currentState = this.stateMap.query;
            return 1;
        }
    };

    QueryDivider.prototype.inlineComment = function(query, ch, pos) {
        if (DEBUG) {
            console.log("inlineComment: " + ch);
        }
        if (ch === '*') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.maybeInlineCommentEnd;
            return 1;
        } else {
            this.buffer.push(ch);
            return 1;
        }
    };

    QueryDivider.prototype.maybeInlineCommentEnd = function(query, ch, pos) {
        if (DEBUG) {
            console.log("maybeInlineCommentEnd: " + ch);
        }
        if (ch === '*') {
            this.buffer.push(ch);
            return 1;
        } else if (ch === '/') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.query;
            return 1;
        } else {
            this.buffer.push(ch);
            this.currentState = this.stateMap.inlineComment;
            return 1;
        }
    };

    QueryDivider.prototype.maybeDelimiterDef = function(query, ch, pos) {
        if (DEBUG) {
            console.log("maybeDelimiterDef: " + ch);
        }
        this.maybeDelimiterDefCount++;
        if (ch.toLowerCase() === DELIMITER.charAt(this.maybeDelimiterDefCount).toLowerCase()) {
            if ((this.maybeDelimiterDefCount + 1) === DELIMITER.length) {
                this.currentState = this.stateMap.delimiterDef;
                this.delimiterDefCandidate = [];
                this.maybeDelimiterDefBuffer = [];
                return 1;
            } else {
                this.maybeDelimiterDefBuffer.push(ch);
                return 1;
            }
        } else {
            this.buffer = this.buffer.concat(this.maybeDelimiterDefBuffer);
            this.buffer.push(ch);
            this.maybeDelimiterDefBuffer = [];
            this.currentState = this.stateMap.query;
            return 1;
        }
    };

    QueryDivider.prototype.delimiterDef = function(query, ch, pos) {
        if (DEBUG) {
            console.log("delimiterDef: " + ch);
        }
        if (ch === ' ') {
            if (this.delimiterDefCandidate.length === 0) {
                return 1;
            } else {
                this.delimiter = this.delimiterDefCandidate.join("");
                this.currentState = this.stateMap.delimiterDefEnd;
                _appendBufferToResult.call(this);
                return 1;
            }
        } else if (ch === '\n') {
            if (this.delimiterDefCandidate.length === 0) {
                throw new ParseError("Delimiter not defined at " + pos);
            } else {
                this.delimiter = this.delimiterDefCandidate.join("");
                this.currentState = this.stateMap.lineStart;
                _appendBufferToResult.call(this);
                return 1;
            }
        } else {
            this.delimiterDefCandidate.push(ch);
            return 1;
        }
    };

    QueryDivider.prototype.delimiterDefEnd = function(query, ch, pos) {
        if (DEBUG) {
            console.log("delimiterEnd: " + ch);
        }
        if (ch === '\n') {
            this.currentState = this.stateMap.lineStart;
            return 1;
        } else {
            return 1;
        }
    };

    QueryDivider.prototype.maybeDelimiter = function(query, ch, pos) {
        if (DEBUG) {
            console.log("maybeDelimiter: " + ch);
        }
        this.maybeDelimiterCount++;
        if (ch === this.delimiter.charAt(this.maybeDelimiterCount)) {
            if ((this.maybeDelimiterCount + 1) === this.delimiter.length) {
                _appendBufferToResult.call(this);
                this.currentState = this.stateMap.query;
                return 1;
            } else {
                return 1;
            }
        } else {
            this.currentState = this.stateMap.query;
            this.skipDelimiterCheck = true;
            return this.maybeDelimiterCount * -1;
        }
    };

    QueryDivider.prototype.singleStringLeteral = function(query, ch, pos) {
        if (DEBUG) {
            console.log("singleStringLeteral: " + ch);
        }
        if (ch === '\\') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.escapedSingleStringLeteral;
            return 1;
        } else if (ch === '\'') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.maybeSingleStringLeteralEnd;
            return 1;
        } else {
            this.buffer.push(ch);
            return 1;
        }
    };

    QueryDivider.prototype.maybeSingleStringLeteralEnd = function(query, ch, pos) {
        if (DEBUG) {
            console.log("maybeSingleStringLeteralEnd: " + ch);
        }
        if (ch === '\'') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.singleStringLeteral;
            return 1;
        } else {
            // Re-evaluate as "query" state
            this.currentState = this.stateMap.query;
            return 0;
        }
    };

    QueryDivider.prototype.escapedSingleStringLeteral = function(query, ch, pos) {
        if (DEBUG) {
            console.log("escapedSingleStringLeteral: " + ch);
        }
        this.buffer.push(ch);
        this.currentState = this.stateMap.singleStringLeteral;
        return 1;
    };

    QueryDivider.prototype.doubleStringLeteral = function(query, ch, pos) {
        if (DEBUG) {
            console.log("doubleStringLeteral: " + ch);
        }
        if (ch === '\\') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.escapedDoubleStringLeteral;
            return 1;
        } else if (ch === '"') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.maybeDoubleStringLeteralEnd;
            return 1;
        } else {
            this.buffer.push(ch);
            return 1;
        }
    };

    QueryDivider.prototype.maybeDoubleStringLeteralEnd = function(query, ch, pos) {
        if (DEBUG) {
            console.log("maybeDoubleStringLeteralEnd: " + ch);
        }
        if (ch === '"') {
            this.buffer.push(ch);
            this.currentState = this.stateMap.doubleStringLeteral;
            return 1;
        } else {
            // Re-evaluate as "query" state
            this.currentState = this.stateMap.query;
            return 0;
        }
    };

    QueryDivider.prototype.escapedDoubleStringLeteral = function(query, ch, pos) {
        if (DEBUG) {
            console.log("escapedDoubleStringLeteral: " + ch);
        }
        this.buffer.push(ch);
        this.currentState = this.stateMap.doubleStringLeteral;
        return 1;
    };

    QueryDivider.prototype.setDebug = function(debug) {
        DEBUG = debug;
    };

    // Export

    MySQL.QueryDivider = QueryDivider;

})(MySQL.ParseError);

(function() {
    "use strict";

    // Constructor

    var ColumnType = function() {
        this.typeMap = {
            "0": "DECIMAL",
            "1": "TINY",
            "2": "SHORT",
            "3": "LONG",
            "4": "FLOAT",
            "5": "DOUBLE",
            "6": "NULL",
            "7": "TIMESTAMP",
            "8": "LONGLONG",
            "9": "INT24",
            "10": "DATE",
            "11": "TIME",
            "12": "DATETIME",
            "13": "YEAR",
            "14": "NEWDATE",
            "15": "VARCHAR",
            "16": "BIT",
            "17": "TIMESTAMP2",
            "18": "DATETIME2",
            "19": "TIME2",
            "246": "NEWDECIMAL",
            "247": "ENUM",
            "248": "SET",
            "249": "TINY_BLOB",
            "250": "MEDIUM_BLOB",
            "251": "LONG_BLOB",
            "252": "BLOB",
            "253": "VAR_STRING",
            "254": "STRING",
            "255": "GEOMETRY"
        };
    };

    // Public methods

    ColumnType.prototype.getColumnTypeName = function(code) {
        return this.typeMap[String(code)];
    };

    // Export

    MySQL.columnType = new ColumnType();

})();
