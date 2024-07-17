//SPDX-License-Identifier: MIT

import { DateTime } from "../external/DateTime.sol";

import { StringConversionUtils } from "../external/StringConversionUtils.sol";

pragma solidity ^0.8.18;

library TMTimestampParsing {
    
    using StringConversionUtils for string;

    /**
     * @notice Iterates through every character in the date string and splits the string at each dash, "T", or colon. Function will revert
     * if there are not 6 substrings formed from the split. The substrings are then converted to uints and passed to the DateTime lib
     * to get the unix timestamp. This function is specific to the date format used by Ticketmaster, not suitable for use with other date
     * formats.
     */
    function _dateStringToTimestamp(string memory _dateString) internal pure returns (uint256 unOffsetTimestamp) {
        string[6] memory extractedStrings;
        uint256 breakCounter;
        uint256 lastBreak;
        for (uint256 i = 0; i < bytes(_dateString).length; i++) {
            if (bytes(_dateString)[i] == 0x2d || bytes(_dateString)[i] == 0x3a || bytes(_dateString)[i] == 0x54) {
                extractedStrings[breakCounter] = _dateString.substring(lastBreak, i);
                lastBreak = i + 1;
                breakCounter++;
            }
        }
        // Add last substring to array
        extractedStrings[breakCounter] = _dateString.substring(lastBreak, bytes(_dateString).length);

        // Check that exactly 6 substrings were found (string is split at 5 different places)
        require(breakCounter == 5, "Invalid date string");

        unOffsetTimestamp = DateTime.timestampFromDateTime(
            extractedStrings[0].stringToUint(0),    // year
            extractedStrings[1].stringToUint(0),    // month
            extractedStrings[2].stringToUint(0),    // day
            extractedStrings[3].stringToUint(0),    // hour
            extractedStrings[4].stringToUint(0),    // minute
            0                                       // we don't need to the second granularity
        );
    }
}
