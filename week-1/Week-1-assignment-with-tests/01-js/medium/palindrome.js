/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(s) 
{
    s=s.toLowerCase();
    s=s.replace(/[^a-z0-9]/g, '',)
    left=0;
    right=s.length-1;
    while(left<right){
        if(s[left]!==s[right])
         return false;
        left++;
        right--;
    }
    return true;
  };

