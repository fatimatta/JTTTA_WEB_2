//using JTTTA_WEB_2.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;

//namespace JTTTA_WEB_2.Controllers
//{
//    public class TransaksiJT18Controller : Controller
//    {
//        DB_JTTTA_WEBEntities p_lts_db = new DB_JTTTA_WEBEntities();
//        // GET: BarangKeluar
//        private MenuLeftClass MenuLeftClass = new MenuLeftClass();
//        //private string iStrSessNRP = string.Empty;
//        //private string iStrSessDistrik = string.Empty;
//        //private string iStrSessGPID = "0";
//        //public bool iStrStatus;
//        private string leftmenu = string.Empty;


//        private string loadMenu()
//        {
//            //this.pv_CustLoadSession();
//            //if (Session["leftMenu"] == null)
//            //{
//            //    Session["leftMenu"] = menuLeftClass.recursiveMenu(0, Convert.ToInt32(iStrSessGPID));
//            //}
//            //return (string)Session["leftMenu"];
//            //leftmenu = MenuLeftClass.recursiveMenu(0, Convert.ToInt32(Session["akses"]));
//            leftmenu = MenuLeftClass.recursiveMenu(0, 0);
//            return leftmenu;
//        }
//        // GET: TransaksiJT18
//        public ActionResult Index()
//        {
//            return View();
//        }
//    }
//}