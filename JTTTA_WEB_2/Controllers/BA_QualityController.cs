using JTTTA_WEB_2.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JTTTA_WEB_2.Controllers
{
    public class BA_QualityController : Controller
    {
        DBContextDataContext db = new DBContextDataContext();
        // GET: BA_Quality
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult InputQuality()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetQuality()
        {
            try
            {
                var data = db.TBL_R_BA_QUALITies;

                return Json(new { Total = data.Count(), Data = data });
            }
            catch (Exception e)
            {
                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult GetRom()
        {
            try
            {
                var romData = db.TBL_R_ROMs;

                return Json(new { Total = romData.Count(), Data = romData });
            }
            catch (Exception e)
            {
                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult CreateQuality(TBL_R_BA_QUALITY input)
        {
            try
            {
                TBL_R_BA_QUALITY model = new TBL_R_BA_QUALITY();

                model.Tanggal = input.Tanggal;
                model.ROM_NAME = input.ROM_NAME;
                model.MATERIAL_NAME = input.MATERIAL_NAME;

                model.ASH = input.ASH;
                model.TM = input.TM;
                model.IM = input.IM;
                model.VM = input.VM;
                model.FC = input.FC;
                model.TS = input.TS;
                model.CVA = input.CVA;
                model.CVD = input.CVD;
                model.RD = input.RD;
                model.HGI = input.HGI;
                model.CSN = input.CSN;
                model.IS = input.IS;
                model.MC = input.MC;
                model.MD = input.MD;
                model.ML = input.ML;
                model.FF = input.FF;
                model.SO = input.SO;
                model.PR = input.PR;

                db.TBL_R_BA_QUALITies.InsertOnSubmit(model);
                db.SubmitChanges();

                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });
            }
            catch (Exception ex)
            {
                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateQuality(TBL_R_BA_QUALITY param)
        {
            try
            {
                TBL_R_BA_QUALITY model = db.TBL_R_BA_QUALITies.Where(x => x.Id.Equals(param.Id)).FirstOrDefault();

                if (model.Tanggal != param.Tanggal)
                {
                    string s = param.Tanggal;
                    var setDate = DateTime.ParseExact(s,
                               "ddd MMM dd yyyy HH:mm:ss 'GMT+0700 (Indochina Time)'",
                               CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");

                    model.Tanggal = setDate;
                }

                model.ROM_NAME = param.ROM_NAME;
                model.MATERIAL_NAME = param.MATERIAL_NAME;

                model.ASH = param.ASH;
                model.TM = param.TM;
                model.IM = param.IM;
                model.VM= param.VM;
                model.FC = param.FC;
                model.TS = param.TS;
                model.CVA = param.CVA;
                model.CVD = param.CVD;
                model.RD = param.RD;
                model.HGI = param.HGI;
                model.CSN = param.CSN;
                model.IS = param.IS;
                model.MC = param.MC;
                model.MD = param.MD;
                model.ML = param.ML;
                model.FF = param.FF;
                model.SO = param.SO;
                model.PR = param.PR;

                db.SubmitChanges();

                return Json(new { status = true, remark = "Data Berhasil Diubah!" });
            }
            catch (Exception ex)
            {
                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult DeleteQuality(TBL_R_BA_QUALITY param)
        {
            try
            {
                TBL_R_BA_QUALITY model = db.TBL_R_BA_QUALITies.Where(x => x.Id.Equals(param.Id)).FirstOrDefault();

                db.TBL_R_BA_QUALITies.DeleteOnSubmit(model);
                db.SubmitChanges();

                return Json(new { status = true, remark = "Data Berhasil Dihapus!" });
            }
            catch (Exception ex)
            {
                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}