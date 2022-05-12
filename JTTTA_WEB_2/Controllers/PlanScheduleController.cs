using JTTTA_WEB_2.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JTTTA_WEB_2.Controllers
{
    public class PlanScheduleController : Controller
    {
        DBContextDataContext db = new DBContextDataContext();

        // GET: PlanScheduler
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetPlanData()
        {
            try
            {
                var data = db.TBL_R_PLANNINGs;

                string JSONString = string.Empty;
                //JSONString = JsonConvert.SerializeObject(data);
                //return Json(JSONString, JsonRequestBehavior.AllowGet);
                //var jsonObject = JSON.parse(data);

                return Json(data);
                //return Json(new { Total = data.Count(), Data = data });
            }
            catch (Exception e)
            {
                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult CreatePlanSchedule(TBL_R_PLANNING input)
        {
            try
            {
                TBL_R_PLANNING model = new TBL_R_PLANNING();

                model.PLAN_ID = Guid.NewGuid().ToString();
                model.PLAN_START_TIME = input.PLAN_START_TIME;
                model.PLAN_END_TIME = input.PLAN_END_TIME;
                model.PLAN_SEAM = input.PLAN_SEAM;
                model.PLAN_BLOCK = input.PLAN_BLOCK;
                model.PLAN_STRIP = input.PLAN_STRIP;
                model.PLAN_ELEVASI = input.PLAN_ELEVASI;
                model.PLAN_MATERIAL = input.PLAN_MATERIAL;
                model.PLAN_DEST = input.PLAN_DEST;
                model.PLAN_INVENTORY = input.PLAN_INVENTORY;
                model.PLAN_ASH = input.PLAN_ASH;
                model.PLAN_TM = input.PLAN_TM;
                model.PLAN_IM = input.PLAN_IM;
                model.PLAN_VM = input.PLAN_VM;
                model.PLAN_FC = input.PLAN_FC;
                model.PLAN_TS = input.PLAN_TS;
                model.PLAN_CVA = input.PLAN_CVA;
                model.PLAN_CVD = input.PLAN_CVD;
                model.PLAN_RD = input.PLAN_RD;
                model.PLAN_HGI = input.PLAN_HGI;
                model.PLAN_CSN = input.PLAN_CSN;
                model.PLAN_IS = input.PLAN_IS;
                model.PLAN_MC = input.PLAN_MC;
                model.PLAN_MD = input.PLAN_MD;
                model.PLAN_ML = input.PLAN_ML;
                model.PLAN_FF = input.PLAN_FF;
                model.PLAN_SO = input.PLAN_SO;
                model.PLAN_PR = input.PLAN_PR;               

                db.TBL_R_PLANNINGs.InsertOnSubmit(model);
                db.SubmitChanges();

                return Json(new { status = true, remark = "Data Berhasil Disimpan!" });
            }
            catch (Exception ex)
            {
                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult GetMaterial()
        {
            try
            {
                //List<TBL_R_MATERIAL> materialData = new List<TBL_R_MATERIAL>();
                var materialData = db.TBL_R_MATERIALs;

                return Json(new { Total = materialData.Count(), Data = materialData });
            }
            catch (Exception e)
            {
                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}