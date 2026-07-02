import { useState, useEffect } from "react";

const useTypewriterHTML = (text, speed = 30) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const regex = /(<[^>]+>)|([^<]+)/g; // matches tags or plain text
    const parts = text.match(regex);    // split text into tags and text

    let i = 0;
    let temp = "";

    const type = () => {
      if (i >= parts.length) return;

      const part = parts[i];

      if (part.startsWith("<")) {
        // instantly append tag
        temp += part;
        setDisplayed(temp);
        i++;
        type(); // immediately move to next part
      } else {
        // type text character by character
        let j = 0;
        const typeText = () => {
          if (j >= part.length) {
            i++;
            type(); // move to next part
            return;
          }
          temp += part[j];
          setDisplayed(temp);
          j++;
          setTimeout(typeText, speed);
        };
        typeText();
      }
    };

    type();
  }, [text, speed]);

  return displayed;
};

export default useTypewriterHTML;