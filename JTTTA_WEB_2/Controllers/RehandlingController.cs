//using JTTTA_WEB_2.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;

//namespace JTTTA_WEB_2.Controllers
//{
//    public class RehandlingController : Controller
//    {
//        DB_JTTTA_WEBEntities p_lts_db = new DB_JTTTA_WEBEntities();
//        // GET: BarangKeluar
//        private MenuLeftClass MenuLeftClass = new MenuLeftClass();
//        //private string iStrSessNRP = string.Empty;
//        //private string iStrSessDistrik = string.Empty;
//        //private string iStrSessGPID = "0";
//        //public bool iStrStatus;
//        private string leftmenu = string.Empty;
//        // GET: Rehandling

//        //private string loadMenu()
//        //{
//        //    //this.pv_CustLoadSession();
//        //    //if (Session["leftMenu"] == null)
//        //    //{
//        //    //    Session["leftMenu"] = menuLeftClass.recursiveMenu(0, Convert.ToInt32(iStrSessGPID));
//        //    //}
//        //    //return (string)Session["leftMenu"];
//        //    //leftmenu = MenuLeftClass.recursiveMenu(0, Convert.ToInt32(Session["akses"]));
//        //    leftmenu = MenuLeftClass.recursiveMenu(0, 0);
//        //    return leftmenu;
//        //}


//        public ActionResult Index()
//        {
//            //ViewBag.leftMenu = loadMenu();
//            return View();
//        }

//        public ActionResult list_hopper()
//        {

//            IQueryable<TBL_R_DESTINATION> Get = p_lts_db.TBL_R_DESTINATION.Where(x => x.DEST_NAME.Contains("HOPPER"));
//            var i_tbl = Get;
//            return Json(new { Total = i_tbl.Count(), Data = i_tbl });


//        }

//        public ActionResult list_rom()
//        {

//            IQueryable<TBL_R_DESTINATION> Get = p_lts_db.TBL_R_DESTINATION.Where(x => !x.DEST_NAME.Contains("HOPPER"));
//            var i_tbl = Get;
//            return Json(new { Total = i_tbl.Count(), Data = i_tbl });


//        }
//    }
//}