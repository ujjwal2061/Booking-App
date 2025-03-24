 function  Description  ({ description }) {
    if (!description) return null;
    
   
    const paragraphs = description.split(/\n\n+/);
    
    return (
      <div className="mt-4 space-y-4">
        {paragraphs.map((paragraph, index) => {
          // Check if paragraph seems like a list (contains multiple lines with bullets or numbers)
          if (paragraph.includes('\n•') || /\n\d+\./.test(paragraph)) {
            const listItems = paragraph.split('\n').filter(item => item.trim());
            const title = listItems[0].endsWith(':') ? listItems.shift() : null;
            
            return (
              <div key={index}>
                {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {listItems.map((item, i) => (
                    <li key={i}>{item.replace(/^[•\-*]|\d+\.\s/, '')}</li>
                  ))}
                </ul>
              </div>
            );
          }
          
          // Check if paragraph seems like a heading (short and ends with colon)
          if (paragraph.length < 50 && paragraph.endsWith(':')) {
            return <h3 key={index} className="text-lg font-semibold">{paragraph}</h3>;
          }
          
        
          return <p key={index} className="text-gray-700">{paragraph}</p>;
        })}
      </div>
    );
  };
  export default Description