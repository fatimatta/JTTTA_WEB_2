////using JTTTA_WEB_2.Models;
//using Kendo.DynamicLinq;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;

//namespace JTTTA_WEB_2.Controllers
//{
//    public class TransaksiJTSMMController : Controller
//    {
//        DB_JTTTA_WEBEntities db = new DB_JTTTA_WEBEntities();
//        //DB_JTTTA_WEBEntities p_lts_db = new DB_JTTTA_WEBEntities();
//        //Entities db = new Entities();
//        // GET: BarangKeluar
//        //private MenuLeftClass MenuLeftClass = new MenuLeftClass();
//        //private string iStrSessNRP = string.Empty;
//        //private string iStrSessDistrik = string.Empty;
//        //private string iStrSessGPID = "0";
//        //public bool iStrStatus;
//        private string leftmenu = string.Empty;


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

//        // GET: TransaksiJTSMM
//        public ActionResult Index()
//        {
//            //ViewBag.leftMenu = loadMenu();
//            return View();
//        }

//        public ActionResult InsertTrans()
//        {
//            return View();
//        }


//        #region master data

//        [HttpPost]
//        public ActionResult ListJT()
//        {
//            try
//            {
//                IQueryable<TBL_R_JT> Get = db.TBL_R_JT;
//                var i_tbl = Get;
//                return Json(new { Total = i_tbl.Count(), Data = i_tbl });
//            }
//            catch (Exception e)
//            {
//                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult ListMaterial()
//        {
//            try
//            {
//                IQueryable<TBL_R_MATERIAL> Get = db.TBL_R_MATERIAL;
//                var i_tbl = Get;
//                return Json(new { Total = i_tbl.Count(), Data = i_tbl });
//            }
//            catch (Exception e)
//            {
//                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult ListPit()
//        {
//            try
//            {
//                IQueryable<TBL_R_PIT> Get = db.TBL_R_PIT;
//                var i_tbl = Get;
//                return Json(new { Total = i_tbl.Count(), Data = i_tbl });
//            }
//            catch (Exception e)
//            {
//                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult ListShift()
//        {
//            try
//            {
//                IQueryable<VW_R_SHIFT> Get = db.VW_R_SHIFT;
//                var i_tbl = Get;
//                return Json(new { Total = i_tbl.Count(), Data = i_tbl });
//            }
//            catch (Exception e)
//            {
//                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult ListCondition()
//        {
//            try
//            {
//                IQueryable<TBL_R_CONDITION> Get = db.TBL_R_CONDITION;
//                var i_tbl = Get;
//                return Json(new { Total = i_tbl.Count(), Data = i_tbl });
//            }
//            catch (Exception e)
//            {
//                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult ListDestination()
//        {
//            try
//            {
//                IQueryable<TBL_R_DESTINATION> Get = db.TBL_R_DESTINATION;
//                var i_tbl = Get;
//                return Json(new { Total = i_tbl.Count(), Data = i_tbl });
//            }
//            catch (Exception e)
//            {
//                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }


//        [HttpPost]
//        public ActionResult ListUnit()
//        {
//            try
//            {
//                IQueryable<TBL_R_UNIT> Get = db.TBL_R_UNIT;
//                var i_tbl = Get;
//                return Json(new { Total = i_tbl.Count(), Data = i_tbl });
//            }
//            catch (Exception e)
//            {
//                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        #endregion


//        [HttpPost]
//        public ActionResult readTransaction(int take, int skip, IEnumerable<Kendo.DynamicLinq.Sort> sort, Kendo.DynamicLinq.Filter filter, string sTgl)
//        {


//            try
//            {

//                var i_tbl = db.VW_T_TRANSAKSI.Where(x => x.TRANS_TGL_PRODUKSI.Equals(sTgl));
//                return this.Json(i_tbl.ToDataSourceResult(take, skip, sort, filter));
//                //if ((int)Session["akses"] == 0)
//                //{
//                //}
//                //else
//                //{
//                //    var i_tbl = p_lts_db.VW_T_TRANSAKSIs.Where(x => x.KLR_REQUESTBY.Equals(Session["NRP"]));
//                //    return this.Json(i_tbl.ToDataSourceResult(take, skip, sort, filter));
//                //}


//            }
//            catch (Exception ex)
//            {
//                return this.Json(ex);
//            }
//        }


//        [HttpPost]
//        public ActionResult updateTransaction(TBL_T_TRANSAKSI s_trans)
//        {
//            try
//            {
//                int tare = getTare(s_trans.TRANS_NO_UNIT);
//                int gross = 0;


//                if (s_trans.TRANS_GROSS == 0 && s_trans.TRANS_TARE == 0)
//                {
//                    gross = 0;
//                    tare = 0;
//                }
//                else
//                {
//                    gross = s_trans.TRANS_GROSS;
//                    tare = s_trans.TRANS_TARE;
//                }


//                TBL_T_TRANSAKSI iTbl = db.TBL_T_TRANSAKSI.Where(x => x.TRANS_RAW_ID == s_trans.TRANS_RAW_ID).FirstOrDefault();

//                //iTbl.TRANS_RAW_ID = s_trans.TRANS_RAW_ID;
//                //iTbl.TRANS_DOCKET_NO = s_trans.TRANS_DOCKET_NO;
//                //iTbl.TRANS_COAL_NUMBER = s_trans.TRANS_COAL_NUMBER;
//                iTbl.TRANS_PIT = s_trans.TRANS_PIT;
//                iTbl.TRANS_BLOCK = s_trans.TRANS_BLOCK;
//                iTbl.TRANS_ELEVASI = s_trans.TRANS_ELEVASI;
//                iTbl.TRANS_SEAM = s_trans.TRANS_SEAM;
//                iTbl.TRANS_RAW = s_trans.TRANS_RAW;
//                iTbl.TRANS_EXCAVATOR = s_trans.TRANS_EXCAVATOR;
//                iTbl.TRANS_DESTINATION = s_trans.TRANS_DESTINATION;
//                iTbl.TRANS_CONDITION = s_trans.TRANS_CONDITION;
//                iTbl.TRANS_NO_UNIT = s_trans.TRANS_NO_UNIT;
//                iTbl.TRANS_GROSS = s_trans.TRANS_GROSS;
//                iTbl.TRANS_TARE = tare;
//                iTbl.TRANS_NETTO = iTbl.TRANS_GROSS - tare;
//                //iTbl.TRANS_JT_NAME = s_trans.TRANS_JT_NAME;
//                //iTbl.TRANS_STARTTIMBANG = s_trans.TRANS_STARTTIMBANG;
//                //iTbl.TRANS_DATETIME = s_trans.TRANS_DATETIME;
//                //iTbl.TRANS_UPDATE_AT = s_trans.TRANS_UPDATE_AT;
//                //iTbl.TRANS_OPERATOR = s_trans.TRANS_OPERATOR;
//                //iTbl.TRANS_ISDELETED = s_trans.TRANS_ISDELETED;
//                //iTbl.TRANS_SOURCE = s_trans.TRANS_SOURCE;




//                db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });
//            }
//            catch (Exception e)
//            {
//                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }


//        [HttpPost]
//        public ActionResult insertTransaction(TBL_T_TRANSAKSI s_trans)
//        {
//            try
//            {
//                int tare = getTare(s_trans.TRANS_NO_UNIT);

//                TBL_T_TRANSAKSI iTbl = new TBL_T_TRANSAKSI();

//                var avrg = db.CUFN_GET_AVG_TIMBANG(s_trans.TRANS_NO_UNIT, s_trans.TRANS_DATETIME).FirstOrDefault();

//                iTbl.TRANS_RAW_ID = Guid.NewGuid().ToString();
//                iTbl.TRANS_DOCKET_NO = 0;
//                iTbl.TRANS_COAL_NUMBER = 0;
//                iTbl.TRANS_PIT = s_trans.TRANS_PIT;
//                iTbl.TRANS_BLOCK = s_trans.TRANS_BLOCK;
//                iTbl.TRANS_ELEVASI = s_trans.TRANS_ELEVASI;
//                iTbl.TRANS_SEAM = s_trans.TRANS_SEAM;
//                iTbl.TRANS_RAW = s_trans.TRANS_RAW;
//                iTbl.TRANS_EXCAVATOR = s_trans.TRANS_EXCAVATOR;
//                iTbl.TRANS_DESTINATION = s_trans.TRANS_DESTINATION;
//                iTbl.TRANS_CONDITION = s_trans.TRANS_CONDITION;
//                iTbl.TRANS_NO_UNIT = s_trans.TRANS_NO_UNIT;
//                iTbl.TRANS_GROSS = (int)avrg.GROSS;
//                iTbl.TRANS_TARE = (int)avrg.GROSS - tare;
//                iTbl.TRANS_NETTO = tare;
//                iTbl.TRANS_JT_NAME = s_trans.TRANS_JT_NAME;
//                iTbl.TRANS_STARTTIMBANG = null;
//                iTbl.TRANS_DATETIME = s_trans.TRANS_DATETIME;
//                iTbl.TRANS_UPDATE_AT = DateTime.Now;
//                iTbl.TRANS_OPERATOR = s_trans.TRANS_OPERATOR;
//                iTbl.TRANS_ISDELETED = "0";
//                iTbl.TRANS_SOURCE = "MINSERT";



//                db.TBL_T_TRANSAKSI.Add(iTbl);
//                db.SaveChanges();


//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });
//            }
//            catch (Exception e)
//            {
//                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        public ActionResult updateBlokData(string[] s_id, string s_type, string s_value)
//        {
//            try
//            {

//                for (int i = 0; i < s_id.Length; i++)
//                {
//                    TBL_T_TRANSAKSI iTbl = db.TBL_T_TRANSAKSI.Where(x => x.TRANS_RAW_ID == s_id[i]).FirstOrDefault();

//                    if (s_type == "Block")
//                    {
//                        iTbl.TRANS_BLOCK = s_value;
//                    }
//                    else if (s_type == "Elevasi")
//                    {
//                        iTbl.TRANS_ELEVASI = s_value;
//                    }
//                    else if (s_type == "Seam")
//                    {
//                        iTbl.TRANS_SEAM = s_value;
//                    }

//                    db.SaveChanges();

//                }






//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });
//            }
//            catch (Exception e)
//            {
//                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
//            }

//        }


//        public int getTare(string s_noUnit)
//        {
//            try
//            {
//                VW_T_MAX_TARE iTbl = new VW_T_MAX_TARE();

//                var unit = db.TBL_T_TARE.Where(x => x.TARE_NOUNIT.Equals(s_noUnit)).FirstOrDefault();

//                return unit.TARE_VALUE;
//            }
//            catch (Exception ex)
//            {
//                return 0;
//            }
//        }
//    }
//}