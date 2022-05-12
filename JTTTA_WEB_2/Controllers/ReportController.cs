//using JTTTA_WEB_2.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;

//namespace JTTTA_WEB_2.Controllers
//{
//    public class ReportController : Controller
//    {
//        DB_JTTTA_WEBEntities p_lts_db = new DB_JTTTA_WEBEntities();
//        // GET: BarangKeluar
//        private MenuLeftClass MenuLeftClass = new MenuLeftClass();
//        private string iStrSessNRP = string.Empty;
//        private string iStrSessDistrik = string.Empty;
//        private string iStrSessGPID = "0";
//        public bool iStrStatus;
//        private string leftmenu = string.Empty;

//        private string loadMenu()
//        {
//            //this.pv_CustLoadSession();
//            //if (Session["leftMenu"] == null)
//            //{
//            //    Session["leftMenu"] = menuLeftClass.recursiveMenu(0, Convert.ToInt32(iStrSessGPID));
//            //}
//            //return (string)Session["leftMenu"];
//            leftmenu = MenuLeftClass.recursiveMenu(0, Convert.ToInt32(Session["akses"]));
//            return leftmenu;
//        }

//        // GET: Report
//        public ActionResult Index()
//        {
//            //if (Session["NRP"] == null)
//            //{
//            //    return RedirectToAction("Index", "Login");
//            //}
//            ViewBag.leftMenu = loadMenu();

//            return View();
//        }

//        public ActionResult ReportTemplate(int rptId)
//        {

//            //DtSalesDataContext p_ctx_db = new DtSalesDataContext();

//            //var itbl = p_ctx_db.TBL_R_REPORTs.Where(x => x.ReportID.Equals(rptId)).FirstOrDefault();

//            //string ReportServer = itbl.Report_Server;
//            //string ReportPath = itbl.Report_path;
//            //string ReportName = itbl.Report_Alias;


//            //ReportViewer report = new ReportViewer();
//            //report.ProcessingMode = ProcessingMode.Remote;

//            //report.Width = Unit.Percentage(100);
//            //report.Height = Unit.Percentage(100);
//            //report.ServerReport.ReportPath = ReportPath;
//            //report.ShowZoomControl = true;
//            //report.AsyncRendering = true;
//            //report.SizeToReportContent = true;
//            //report.ServerReport.ReportServerUrl = new Uri(ReportServer);
//            //report.ZoomMode = ZoomMode.FullPage;
//            //ViewBag.ReportViewer = report;



//            //ViewBag.Message = ReportName;

//            //if (Session["NRP"] == null)
//            //{
//            //    return RedirectToAction("Index", "Login");
//            //}
//            ViewBag.leftMenu = loadMenu();
//            return View();
//        }
//    }
//}