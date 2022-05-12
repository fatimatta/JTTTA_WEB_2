//using JTTTA_WEB_2.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;

//namespace JTTTA_WEB_2.Controllers
//{
//    public class DashboardController : Controller
//    {
//        DB_JTTTA_WEBEntities _context = new DB_JTTTA_WEBEntities();
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
//        // GET: Dashboard
//        public ActionResult Index()
//        {
//            ViewBag.leftMenu = loadMenu();
//            return View();

//        }

//        public ActionResult Monthly()
//        {
//            ViewBag.leftMenu = loadMenu();
//            return View();

//        }

//        //#region daily dashboard


//        //public ActionResult getJTSmmProduksi(string s_tanggal)
//        //{
//        //    try
//        //    {

//        //        var tbl = _context.CUFN_DASHBOARD_JTSMM_SHIFTLY(s_tanggal).OrderBy(x => x.tanggal_jam).ToList();


//        //        return Json(new { data = tbl, total = tbl.Count });
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return this.Json(new { error = ex.ToString() });
//        //    }

//        //}


//        //public ActionResult getJTSmmProduksi_category(string s_tanggal, string s_cat)
//        //{
//        //    try
//        //    {
//        //        //var tbl = _context.VwTDataJtSmms
//        //        //.Where(wh => wh.TransTglProduksi.Equals(s_tanggal) && wh.PitName != null)
//        //        //.GroupBy(gr => gr.PitName)
//        //        //.Select(r => new Pit_group()
//        //        //{
//        //        //    pit_name = r.Key,
//        //        //    pit_produksi = ((int)r.Select(rw => rw.TransNetto).Sum())/1000
//        //        //}
//        //        //).ToList();

//        //        var tbl = _context.CUFN_DASHBOARD_JTSMM_SUMMARY_CATEGORY(s_tanggal, s_cat).OrderByDescending(x => x.NETTO).ToList();

//        //        if (s_cat == "U")
//        //        {
//        //            tbl = _context.CUFN_DASHBOARD_JTSMM_SUMMARY_CATEGORY(s_tanggal, s_cat).Take(10).OrderByDescending(x => x.NETTO).ToList();
//        //        }



//        //        return Json(new { data = tbl, total = tbl.Count });
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return this.Json(new { error = ex.ToString() });
//        //    }

//        //}


//        //public ActionResult getJTSmmProduksi_pit(string s_tanggal)
//        //{
//        //    try
//        //    {
//        //        //var tbl = _context.VwTDataJtSmms
//        //        //.Where(wh => wh.TransTglProduksi.Equals(s_tanggal) && wh.PitName != null)
//        //        //.GroupBy(gr => gr.PitName)
//        //        //.Select(r => new Pit_group()
//        //        //{
//        //        //    pit_name = r.Key,
//        //        //    pit_produksi = ((int)r.Select(rw => rw.TransNetto).Sum())/1000
//        //        //}
//        //        //).ToList();

//        //        var tbl = _context.CUFN_DASHBOARD_JTSMM_SUMMARY_CATEGORY(s_tanggal, "P").ToList();



//        //        return Json(new { data = tbl, total = tbl.Count });
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return this.Json(new { error = ex.ToString() });
//        //    }

//        //}



//        //public ActionResult getJTSmmProduksi_summaryDetil(string s_tipe, string s_param, string s_tgl_param)
//        //{
//        //    try
//        //    {
//        //        var tbl = _context.CUFN_DASHBOARD_JTSMM_SUMMARY_BLOCK(s_tgl_param, s_param, s_tipe).OrderByDescending(x => x.netto).ToList();



//        //        return Json(new { data = tbl, total = tbl.Count });
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return this.Json(new { error = ex.ToString() });
//        //    }

//        //}

//        //public ActionResult getJTSmmProduksitbl(CUFN_DASHBOARD_JTSMM_SHIFTLYResult s_param)
//        //{
//        //    try
//        //    {
//        //        //var i_tbl_t = _context.TblRShippers;

//        //        var tbl = _context.CUFN_DASHBOARD_JTSMM_SHIFTLY(s_param.trans_tgl_produksi).ToList();

//        //        return Json(new { Data = tbl });
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return this.Json(new { error = ex.ToString() });
//        //    }

//        //}


//        //public ActionResult getSumaryProduksi(string s_tanggal)
//        //{
//        //    try
//        //    {
//        //        //var i_tbl_t = _context.TblRShippers;

//        //        var tbl = _context.CUFN_DASHBOARD_JTSMM_SUMMARY_PRODUKSI(s_tanggal).ToList();

//        //        return Json(new { Data = tbl });
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return this.Json(new { error = ex.ToString() });
//        //    }

//        //}

//        //public ActionResult getJTSmmProduksi_shiftly(string s_tanggal)
//        //{
//        //    try
//        //    {
//        //        var tbl = _context.CUFN_DASHBOARD_JTSMM_SHIFTLY_GRP_SHIFT(s_tanggal).ToList();

//        //        return Json(new { data = tbl, total = tbl.Count });
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return this.Json(new { error = ex.ToString() });
//        //    }

//        //}

//        //#endregion


//        //#region Montly Report

//        //public ActionResult getJTSmmProduksi_Monthly(string s_tanggal)
//        //{
//        //    try
//        //    {

//        //        var tbl = _context.CUFN_DASHBOARD_JTSMM_MONTHLY_SHIFT(s_tanggal).ToList();


//        //        return Json(new { data = tbl, total = tbl.Count });
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return this.Json(new { error = ex.ToString() });
//        //    }

//        //}

//        //#endregion
//    }
//}