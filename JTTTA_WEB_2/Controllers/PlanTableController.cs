using JTTTA_WEB_2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JTTTA_WEB_2.Controllers
{
    public class PlanTableController : Controller
    {
        DBContextDataContext db = new DBContextDataContext();

        // GET: PlanTable
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetPlanData(string tgl_awal, string tgl_akhir)
        {
            try
            {                
                var getViewPlan = db.VW_R_INDEX_PLANNINGs.OrderByDescending(x => x.PLAN_TANGGAL).ThenByDescending(y => y.PLAN_SHIFT);

                if (tgl_awal != "")
                {
                    //getViewPlan = db.VW_R_INDEX_PLANNINGs.Where(x => x.PLAN_TANGGAL >= tgl_awal && x.PLAN_TANGGAL <= tgl_akhir);
                    var data = (from x in db.VW_R_INDEX_PLANNINGs.ToList() where (DateTime.Parse(x.PLAN_TANGGAL) >= DateTime.Parse(tgl_awal) && DateTime.Parse(x.PLAN_TANGGAL) <= DateTime.Parse(tgl_akhir)) select x);

                    return Json(new { Total = data.Count(), Data = data });
                }
                else
                {
                    return Json(new { Total = getViewPlan.Count(), Data = getViewPlan });
                }

                #region unused
                //List<TBL_R_PLANNING> result = new List<TBL_R_PLANNING>();
                //TBL_R_PLANNING data = new TBL_R_PLANNING();

                //var getPlanData = db.TBL_R_PLANNINGs;

                //foreach (var item in getPlanData)
                //{
                //    var getMatName = db.TBL_R_MATERIALs.Where(x => x.MATERIAL_CODE.Equals(item.PLAN_MATERIAL)).FirstOrDefault().MATERIAL_NAME;
                //    var getDestName = db.TBL_R_ROMs.Where(y => y.ROM_CODE.Equals(item.PLAN_DEST)).FirstOrDefault().ROM_NAME;

                //    data.PLAN_ID = item.PLAN_ID;
                //    data.PLAN_START_TIME = item.PLAN_START_TIME;
                //    data.PLAN_END_TIME = item.PLAN_END_TIME;
                //    data.PLAN_SEAM = item.PLAN_SEAM;
                //    data.PLAN_BLOCK = item.PLAN_BLOCK;
                //    data.PLAN_STRIP = item.PLAN_STRIP;
                //    data.PLAN_ELEVASI = item.PLAN_ELEVASI;
                //    data.PLAN_MATERIAL = getMatName;
                //    data.PLAN_DEST = getDestName;
                //    data.PLAN_INVENTORY = item.PLAN_INVENTORY;
                //    data.PLAN_ASH = item.PLAN_ASH;
                //    data.PLAN_TM = item.PLAN_TM;
                //    data.PLAN_IM = item.PLAN_IM;
                //    data.PLAN_VM = item.PLAN_VM;
                //    data.PLAN_FC = item.PLAN_FC;
                //    data.PLAN_TS = item.PLAN_TS;
                //    data.PLAN_CVA = item.PLAN_CVA;
                //    data.PLAN_CVD = item.PLAN_CVD;
                //    data.PLAN_RD = item.PLAN_RD;
                //    data.PLAN_HGI = item.PLAN_HGI;
                //    data.PLAN_CSN = item.PLAN_CSN;
                //    data.PLAN_IS = item.PLAN_IS;
                //    data.PLAN_MC = item.PLAN_MC;
                //    data.PLAN_MD = item.PLAN_MD;
                //    data.PLAN_ML = item.PLAN_ML;
                //    data.PLAN_FF = item.PLAN_FF;
                //    data.PLAN_SO = item.PLAN_SO;
                //    data.PLAN_PR = item.PLAN_PR;

                //    result.Add(data);
                //}
                #endregion                                
            }
            catch (Exception e)
            {
                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
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

        [HttpPost]
        public ActionResult GetEditData(string idData)
        {
            try
            {
                var tbl = db.TBL_R_PLANNINGs.Where(x => x.PLAN_ID.Equals(idData)).FirstOrDefault();

                return Json(new { status = true, Data = tbl });
            }
            catch (Exception ex)
            {
                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult GetDestination()
        {
            try
            {
                var romData = db.TBL_R_DESTINATIONs;

                return Json(new { Total = romData.Count(), Data = romData });
            }
            catch (Exception e)
            {
                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult GetShift()
        {
            try
            {
                var getData = db.TBL_R_SHIFTs.ToArray();

                return Json(new { Total = getData.Count(), Data = getData });
            }
            catch (Exception e)
            {
                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult SearchByDate(string search1, string search2)
        {
            try
            {
                var data = (from x in db.VW_R_INDEX_PLANNINGs.ToList() where (DateTime.Parse(x.PLAN_TANGGAL) >= DateTime.Parse(search1) && DateTime.Parse(x.PLAN_TANGGAL) <= DateTime.Parse(search2)) select x);
                //var result = db.VW_R_INDEX_PLANNINGs.Where(x => DateTime.Parse(x.PLAN_TANGGAL) >= DateTime.Parse(search1) && DateTime.Parse(x.PLAN_TANGGAL) <= DateTime.Parse(search2));
                return Json(new { status = true, Data = data });
            }
            catch (Exception ex)
            {
                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult CreatePlanSchedule(TBL_R_PLANNING input)
        {
            try
            {
                bool flag = true;
                var message = "";

                //validasi planning dengan Tanggal, Shift, Lokasi

                var checkPlanning = db.CUFN_CHECK_PLANNING(input.PLAN_TANGGAL, input.PLAN_SHIFT, input.PLAN_SEAM, input.PLAN_BLOCK, input.PLAN_ELEVASI, input.PLAN_STRIP).ToList();

                if (checkPlanning.Count > 0)
                {
                    flag = false;
                    message = "Terdapat Planning yang Serupa";
                }

                if (flag)
                {
                    TBL_R_PLANNING model = new TBL_R_PLANNING();

                    model.PLAN_ID = Guid.NewGuid().ToString();
                    model.PLAN_TANGGAL = input.PLAN_TANGGAL;
                    model.PLAN_SHIFT = input.PLAN_SHIFT;

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

                    return Json(new { status = true, remark = "Data Planning Berhasil Disimpan!" });
                }
                else
                {
                    return Json(new { status = false, remark = message });
                }
            }
            catch (Exception ex)
            {
                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdatePlanTable(TBL_R_PLANNING item)
        {
            try
            {
                TBL_R_PLANNING model = db.TBL_R_PLANNINGs.Where(x => x.PLAN_ID.Equals(item.PLAN_ID)).FirstOrDefault();

                model.PLAN_TANGGAL = item.PLAN_TANGGAL;
                model.PLAN_SHIFT = item.PLAN_SHIFT;
                model.PLAN_START_TIME = item.PLAN_START_TIME;
                model.PLAN_END_TIME = item.PLAN_END_TIME;
                model.PLAN_SEAM = item.PLAN_SEAM;
                model.PLAN_BLOCK = item.PLAN_BLOCK;
                model.PLAN_STRIP = item.PLAN_STRIP;
                model.PLAN_ELEVASI = item.PLAN_ELEVASI;
                model.PLAN_MATERIAL = item.PLAN_MATERIAL;
                model.PLAN_DEST = item.PLAN_DEST;
                model.PLAN_INVENTORY = item.PLAN_INVENTORY;
                model.PLAN_ASH = item.PLAN_ASH;
                model.PLAN_TM = item.PLAN_TM;
                model.PLAN_IM = item.PLAN_IM;
                model.PLAN_VM = item.PLAN_VM;
                model.PLAN_FC = item.PLAN_FC;
                model.PLAN_TS = item.PLAN_TS;
                model.PLAN_CVA = item.PLAN_CVA;
                model.PLAN_CVD = item.PLAN_CVD;
                model.PLAN_RD = item.PLAN_RD;
                model.PLAN_HGI = item.PLAN_HGI;
                model.PLAN_CSN = item.PLAN_CSN;
                model.PLAN_IS = item.PLAN_IS;
                model.PLAN_MC = item.PLAN_MC;
                model.PLAN_MD = item.PLAN_MD;
                model.PLAN_ML = item.PLAN_ML;
                model.PLAN_FF = item.PLAN_FF;
                model.PLAN_SO = item.PLAN_SO;
                model.PLAN_PR = item.PLAN_PR;

                db.SubmitChanges();

                return Json(new { status = true, remark = "Data Planning Berhasil Diubah!" });
            }
            catch (Exception ex)
            {
                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult DeletePlanTable(TBL_R_PLANNING item)
        {
            try
            {
                TBL_R_PLANNING model = db.TBL_R_PLANNINGs.Where(x => x.PLAN_ID.Equals(item.PLAN_ID)).FirstOrDefault();

                db.TBL_R_PLANNINGs.DeleteOnSubmit(model);
                db.SubmitChanges();

                return Json(new { status = true, remark = "Data Planning Berhasil Dihapus!" });
            }
            catch (Exception ex)
            {
                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}