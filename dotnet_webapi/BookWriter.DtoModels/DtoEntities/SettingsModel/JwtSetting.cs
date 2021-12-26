using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.DtoModels.DtoEntities.SettingsModel
{
    public class JwtSetting
    {
        public string Seacret { get; set; }
        public int ExpireDays { get; set; }
    }
}
