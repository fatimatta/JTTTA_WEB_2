//using System;
//using System.Collections.Generic;
//using System.Globalization;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;
//using JTTTA_WEB_2.Models;

//namespace JTTTA_WEB_2.Controllers
//{
//    public class PlanningController : Controller
//    {
//        // GET: Planning
//        //DB_JTTTA_WEBEntitiesPlanning context = new DB_JTTTA_WEBEntitiesPlanning();
//        //DB_JTTTA_WEBEntities mainContext = new DB_JTTTA_WEBEntities();
//        //DB_JTTTA_WEBEntities1 secondContext = new DB_JTTTA_WEBEntities1();
//        //DB_JTTTA_WEBEntities db = new DB_JTTTA_WEBEntities();
//        DBContextDataContext db = new DBContextDataContext();
//        public ActionResult Index()
//        {
//            return View();
//        }

//        public ActionResult InsertPlan()
//        {
//            return View();
//        }

//        [HttpPost]
//        public ActionResult GetPlan()
//        {
//            try
//            {
//                var data = db.TBL_R_PLANNINGs;

//                return Json(new { Total = data.Count(), Data = data });
//            }
//            catch (Exception e)
//            {
//                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult GetShift()
//        {
//            try
//            {
//                //List<TBL_R_SHIFT> shiftData = new List<TBL_R_SHIFT>();

//                var getData = db.TBL_R_SHIFTs.ToArray();

//                //shiftData = getData;

//                return Json(new { Total = getData.Count(), Data = getData });
//            }
//            catch (Exception e)
//            {
//                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult GetMaterial()
//        {
//            try
//            {
//                //List<TBL_R_MATERIAL> materialData = new List<TBL_R_MATERIAL>();
//                var materialData = db.TBL_R_MATERIALs;

//                return Json(new { Total = materialData.Count(), Data = materialData });
//            }
//            catch (Exception e)
//            {
//                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult CreatePlan(TBL_R_PLANNING input)
//        {
//            try
//            {
//                TBL_R_PLANNING model = new TBL_R_PLANNING();

//                model.PLAN_ID = Guid.NewGuid().ToString();
//                model.PLAN_SEAM = input.PLAN_SEAM;
//                model.PLAN_BLOCK = input.PLAN_BLOCK;
//                model.PLAN_STRIP = input.PLAN_STRIP;
//                model.PLAN_ELEVASI = input.PLAN_ELEVASI;
//                model.PLAN_MATERIAL = input.PLAN_MATERIAL;
//                model.PLAN_DEST = input.PLAN_DEST;
//                model.PLAN_INVENTORY = input.PLAN_INVENTORY;

//                model.Ash = input.Ash;
//                model.Tm = input.Tm;
//                model.Im = input.Im;
//                model.Vm = input.Vm;
//                model.Fc = input.Fc;
//                model.Ts = input.Ts;
//                model.Cva = input.Cva;
//                model.Cvd = input.Cvd;
//                model.Rd = input.Rd;
//                model.Hgi = input.Hgi;
//                model.Csn = input.Csn;
//                model.Is = input.Is;
//                model.Mc = input.Mc;
//                model.Md = input.Md;
//                model.Ml = input.Ml;
//                model.Ff = input.Ff;
//                model.So = input.So;
//                model.Pr = input.Pr;

//                db.TBL_R_PLANNINGs.InsertOnSubmit(model);
//                db.SubmitChanges();

//                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });
//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult UpdatePlan(TBL_R_PLANNING param)
//        {
//            try
//            {
//                TBL_R_PLANNING model = db.TBL_R_PLANNINGs.Where(x => x.Id.Equals(param.Id)).FirstOrDefault();

//                if (model.Tanggal != param.Tanggal)
//                {
//                    string s = param.Tanggal;
//                    var setDate = DateTime.ParseExact(s,
//                               "ddd MMM dd yyyy HH:mm:ss 'GMT+0700 (Indochina Time)'",
//                               CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");

//                    model.Tanggal = setDate;
//                }

//                //model.SHIFT_NAME = param.SHIFT_NAME;
//                model.Inventory = param.Inventory;
//                model.Seam = param.Seam;
//                model.Sub_Seam = param.Sub_Seam;
//                model.Block = param.Block;
//                model.Strip = param.Strip;
//                model.Ash = param.Ash;
//                model.Tm = param.Tm;

//                model.Elevasi = param.Elevasi;
//                model.MATERIAL_NAME = param.MATERIAL_NAME;
//                model.ROM_NAME = param.ROM_NAME;
//                model.Inventory = param.Inventory;

//                model.Im = param.Im;
//                model.Vm = param.Vm;
//                model.Fc = param.Fc;
//                model.Ts = param.Ts;
//                model.Cva = param.Cva;
//                model.Cvd = param.Cvd;
//                model.Rd = param.Rd;
//                model.Hgi = param.Hgi;
//                model.Csn = param.Csn;
//                model.Is = param.Is;
//                model.Mc = param.Mc;
//                model.Md = param.Md;
//                model.Ml = param.Ml;
//                model.Ff = param.Ff;
//                model.So = param.So;
//                model.Pr = param.Pr;

//                db.SubmitChanges();

//                return Json(new { status = true, remark = "Data Berhasil Diubah!" });
//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult DeletePlan(TBL_R_PLANNING param)
//        {
//            try
//            {
//                TBL_R_PLANNING model = db.TBL_R_PLANNINGs.Where(x => x.Id.Equals(param.Id)).FirstOrDefault();

//                db.TBL_R_PLANNINGs.DeleteOnSubmit(model);
//                db.SubmitChanges();

//                return Json(new { status = true, remark = "Data Berhasil Dihapus!" });
//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }

//        [HttpPost]
//        public ActionResult GetEditData(string idData)
//        {
//            try
//            {
//                var tbl = db.TBL_R_PLANNINGs.Where(x => x.Id.Equals(idData)).FirstOrDefault();

//                return Json(new { status = true, Data = tbl });
//            }
//            catch (Exception ex)
//            {
//                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
//            }
//        }
//    }
//}