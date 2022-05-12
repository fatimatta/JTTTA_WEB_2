//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;

//namespace JTTTA_WEB_2.Models
//{
//    public class MenuLeftClass
//    {
//        private DB_JTTTA_WEBEntities i_obj_ctx;
//        private string str_menuResult = "";
//        private string urlPath = System.Configuration.ConfigurationManager.AppSettings["urlAppPath"].ToString();
//        //private string urlPath = Properties.Settings.Default.urlAppPath.ToString();


//        public string recursiveMenu(int id = 0, int gpId = 0)
//        {
//            i_obj_ctx = new DB_JTTTA_WEBEntities();
//            var iListMenu = i_obj_ctx.VW_R_MENU_LOGIN.Where(f => f.Id == id && f.User_level == gpId.ToString()).OrderBy(f => f.Id).OrderBy(f => f.Urutan);
//            //var iListMenu = i_obj_ctx.TBL_R_MENUs.Where(f => f.Id.Equals(0)).OrderBy(f => f.Id).OrderBy(f => f.Urutan);

//            foreach (var itemMenu in iListMenu)
//            {
//                if (id == 0)
//                {
//                    str_menuResult += "<li>";
//                    //str_menuResult += "<a href='" + urlPath + (string)itemMenu.Link + "'><i class='" + (string)itemMenu.style_class + "'></i> <span>" + (string)itemMenu.Menu + "</span></a>";
//                    str_menuResult += "<a><i class='fa fa-chevron-right'></i> " + (string)itemMenu.Menu + " <span class='fa fa-chevron-down'></span></a>";
//                }

//                if ((int)itemMenu.Menu_link > 0 && itemMenu.Link == "#")
//                {
//                    str_menuResult += "<ul class='nav child_menu'>";
//                    recursiveSubMenu((int)itemMenu.Menu_link, gpId);
//                    str_menuResult += "</ul>";
//                }

//                if (id == 0)
//                {
//                    str_menuResult += "</li>";
//                }
//            }
//            str_menuResult += "</ul>";
//            i_obj_ctx.Dispose();
//            return str_menuResult;
//        }

//        private void recursiveSubMenu(int id = 0, int gpId = 0)
//        {
//            i_obj_ctx = new DB_JTTTA_WEBEntities();
//            var iListMenu = i_obj_ctx.VW_R_MENU_LOGIN.Where(f => f.Id == id && f.User_level == gpId.ToString()).OrderBy(f => f.Id).OrderBy(f => f.Urutan);

//            foreach (var itemMenu in iListMenu)
//            {

//                str_menuResult += "<li>";
//                //str_menuResult += "<a href='" + urlPath + (string)itemMenu.Link + "'> " + (string)itemMenu.Menu + "</a>";
//                if ((int)itemMenu.Menu_link != 0)
//                {
//                    str_menuResult += "<a><i class='fa fa-chevron-right'></i> " + (string)itemMenu.Menu + " <span class='fa fa-chevron-down'></span></a>";
//                }
//                else
//                {
//                    str_menuResult += "<a href='" + urlPath + (string)itemMenu.Link + "'> " + (string)itemMenu.Menu + "</a>";
//                }


//                if ((int)itemMenu.Menu_link > 0)
//                {
//                    str_menuResult += "<ul class='nav child_menu'>";
//                    recursiveSubMenu((int)itemMenu.Menu_link, gpId);
//                    str_menuResult += "</ul>";
//                }
//                str_menuResult += "</li>";
//            }
//            i_obj_ctx.Dispose();
//        }
//    }
//}