//using JTTTA_WEB_2.Models;
//using Kendo.DynamicLinq;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;

//namespace JTTTA_WEB_2.Controllers
//{
//    public class ReferensiController : Controller
//    {
//        // GET: Referensi
//        DB_JTTTA_WEBEntities p_lts_db = new DB_JTTTA_WEBEntities();
//        // GET: BarangKeluar
//        //private MenuLeftClass MenuLeftClass = new MenuLeftClass();
//        //private string iStrSessNRP = string.Empty;
//        //private string iStrSessDistrik = string.Empty;
//        //private string iStrSessGPID = "0";
//        //public bool iStrStatus;
//        //private string leftmenu = string.Empty;

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


//        #region PIT

//        [HttpPost]
//        public ActionResult readRef_Pit(int take, int skip, IEnumerable<Kendo.DynamicLinq.Sort> sort, Kendo.DynamicLinq.Filter filter)
//        {
//            try
//            {
//                var i_tbl = p_lts_db.TBL_R_PIT;
//                return this.Json(i_tbl.ToDataSourceResult(take, skip, sort, filter));
//            }
//            catch (Exception ex)
//            {
//                return this.Json(ex);
//            }
//        }

//        [HttpPost]
//        public ActionResult insert_Pit(TBL_R_PIT s_param)
//        {
//            try
//            {
//                TBL_R_PIT itbl = new TBL_R_PIT();

//                itbl.PIT_CODE = s_param.PIT_CODE;
//                itbl.PIT_NAME = s_param.PIT_NAME;


//                p_lts_db.TBL_R_PIT.Add(itbl);
//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });
//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult update_Pit(TBL_R_PIT s_param)
//        {
//            try
//            {
//                TBL_R_PIT itbl = p_lts_db.TBL_R_PIT.Where(x => x.PIT_CODE.Equals(s_param.PIT_CODE)).FirstOrDefault();

//                itbl.PIT_NAME = s_param.PIT_NAME;

//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });
//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }


//        [HttpPost]
//        public ActionResult delete_Pit(TBL_R_PIT s_param)
//        {
//            try
//            {
//                TBL_R_PIT itbl = p_lts_db.TBL_R_PIT.Where(x => x.PIT_CODE.Equals(s_param.PIT_CODE)).FirstOrDefault();

//                p_lts_db.TBL_R_PIT.Remove(itbl);
//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });
//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        #endregion

//        #region JT

//        [HttpPost]
//        public ActionResult readRef_JT(int take, int skip, IEnumerable<Kendo.DynamicLinq.Sort> sort, Kendo.DynamicLinq.Filter filter)
//        {
//            try
//            {

//                var i_tbl = p_lts_db.TBL_R_JT;
//                return this.Json(i_tbl.ToDataSourceResult(take, skip, sort, filter));

//            }
//            catch (Exception ex)
//            {
//                return this.Json(ex);
//            }
//        }

//        [HttpPost]
//        public ActionResult insert_JT(TBL_R_JT s_param)
//        {
//            try
//            {
//                TBL_R_JT itbl = new TBL_R_JT();

//                itbl.JT_KODE = s_param.JT_KODE;
//                itbl.JT_INSTANCE = s_param.JT_INSTANCE;
//                itbl.JT_AKTIF = "1";


//                p_lts_db.TBL_R_JT.Add(itbl);
//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });

//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult update_JT(TBL_R_JT s_param)
//        {
//            try
//            {
//                TBL_R_JT itbl = p_lts_db.TBL_R_JT.Where(x => x.JT_KODE.Equals(s_param.JT_KODE)).FirstOrDefault();

//                itbl.JT_INSTANCE = s_param.JT_INSTANCE;
//                itbl.JT_AKTIF = s_param.JT_AKTIF;

//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });

//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }


//        [HttpPost]
//        public ActionResult delete_JT(TBL_R_JT s_param)
//        {
//            try
//            {
//                TBL_R_JT itbl = p_lts_db.TBL_R_JT.Where(x => x.JT_KODE.Equals(s_param.JT_KODE)).FirstOrDefault();

//                p_lts_db.TBL_R_JT.Remove(itbl);
//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });

//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }


//        #endregion

//        #region Destination

//        [HttpPost]
//        public ActionResult readRef_Destination(int take, int skip, IEnumerable<Kendo.DynamicLinq.Sort> sort, Kendo.DynamicLinq.Filter filter)
//        {
//            try
//            {

//                var i_tbl = p_lts_db.TBL_R_DESTINATION;
//                return this.Json(i_tbl.ToDataSourceResult(take, skip, sort, filter));

//            }
//            catch (Exception ex)
//            {
//                return this.Json(ex);
//            }
//        }

//        [HttpPost]
//        public ActionResult insert_Destination(TBL_R_DESTINATION s_param)
//        {
//            try
//            {
//                TBL_R_DESTINATION itbl = new TBL_R_DESTINATION();

//                itbl.DEST_CODE = s_param.DEST_CODE;
//                itbl.DEST_NAME = s_param.DEST_NAME;

//                p_lts_db.TBL_R_DESTINATION.Add(itbl);
//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });

//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult update_Destination(TBL_R_DESTINATION s_param)
//        {
//            try
//            {
//                TBL_R_DESTINATION itbl = p_lts_db.TBL_R_DESTINATION.Where(x => x.DEST_CODE.Equals(s_param.DEST_CODE)).FirstOrDefault();

//                itbl.DEST_NAME = s_param.DEST_NAME;

//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });

//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }


//        [HttpPost]
//        public ActionResult delete_Destination(TBL_R_DESTINATION s_param)
//        {
//            try
//            {
//                TBL_R_DESTINATION itbl = p_lts_db.TBL_R_DESTINATION.Where(x => x.DEST_CODE.Equals(s_param.DEST_CODE)).FirstOrDefault();

//                p_lts_db.TBL_R_DESTINATION.Remove(itbl);
//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });

//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }



//        #endregion

//        #region Material

//        [HttpPost]
//        public ActionResult readRef_Material(int take, int skip, IEnumerable<Kendo.DynamicLinq.Sort> sort, Kendo.DynamicLinq.Filter filter)
//        {
//            try
//            {

//                var i_tbl = p_lts_db.TBL_R_MATERIAL;
//                return this.Json(i_tbl.ToDataSourceResult(take, skip, sort, filter));

//            }
//            catch (Exception ex)
//            {
//                return this.Json(ex);
//            }
//        }

//        [HttpPost]
//        public ActionResult insert_Material(TBL_R_MATERIAL s_param)
//        {
//            try
//            {
//                TBL_R_MATERIAL itbl = new TBL_R_MATERIAL();

//                itbl.MATERIAL_CODE = s_param.MATERIAL_CODE;
//                itbl.MATERIAL_NAME = s_param.MATERIAL_NAME;

//                p_lts_db.TBL_R_MATERIAL.Add(itbl);
//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });

//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult update_Material(TBL_R_MATERIAL s_param)
//        {
//            try
//            {
//                TBL_R_MATERIAL itbl = p_lts_db.TBL_R_MATERIAL.Where(x => x.MATERIAL_CODE.Equals(s_param.MATERIAL_CODE)).FirstOrDefault();

//                itbl.MATERIAL_NAME = s_param.MATERIAL_NAME;

//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });

//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }


//        [HttpPost]
//        public ActionResult delete_Material(TBL_R_MATERIAL s_param)
//        {
//            try
//            {
//                TBL_R_MATERIAL itbl = p_lts_db.TBL_R_MATERIAL.Where(x => x.MATERIAL_CODE.Equals(s_param.MATERIAL_CODE)).FirstOrDefault();

//                p_lts_db.TBL_R_MATERIAL.Remove(itbl);
//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });

//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }




//        #endregion

//        #region Condition

//        [HttpPost]
//        public ActionResult readRef_Condition(int take, int skip, IEnumerable<Kendo.DynamicLinq.Sort> sort, Kendo.DynamicLinq.Filter filter)
//        {
//            try
//            {

//                var i_tbl = p_lts_db.TBL_R_CONDITION;
//                return this.Json(i_tbl.ToDataSourceResult(take, skip, sort, filter));

//            }
//            catch (Exception ex)
//            {
//                return this.Json(ex);
//            }
//        }


//        [HttpPost]
//        public ActionResult insert_Condition(TBL_R_CONDITION s_param)
//        {
//            try
//            {
//                TBL_R_CONDITION itbl = new TBL_R_CONDITION();

//                itbl.COND_CODE = s_param.COND_CODE;
//                itbl.COND_NAME = s_param.COND_NAME;

//                p_lts_db.TBL_R_CONDITION.Add(itbl);
//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });

//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult update_Condition(TBL_R_CONDITION s_param)
//        {
//            try
//            {
//                TBL_R_CONDITION itbl = p_lts_db.TBL_R_CONDITION.Where(x => x.COND_CODE.Equals(s_param.COND_CODE)).FirstOrDefault();

//                itbl.COND_NAME = s_param.COND_NAME;

//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });

//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }


//        [HttpPost]
//        public ActionResult delete_Condition(TBL_R_CONDITION s_param)
//        {
//            try
//            {
//                TBL_R_CONDITION itbl = p_lts_db.TBL_R_CONDITION.Where(x => x.COND_CODE.Equals(s_param.COND_CODE)).FirstOrDefault();

//                p_lts_db.TBL_R_CONDITION.Remove(itbl);
//                p_lts_db.SaveChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });

//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }
//        #endregion
//    }
//}