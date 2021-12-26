using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.DtoModels.DtoEntities
{
    public class HyperlinkDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Link { get; set; }
        public int? BookId { get; set; }
        public BookDto Book { get; set; }
    }
}
