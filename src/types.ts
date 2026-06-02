/**
 * ============================================================================
 * 🌌 AEON-MATRIX COGNITIVE OPERATIONS ECOSYSTEM
 * 📑 MODULE: TELEMETRY & SYSTEM REASONING TOKENS (V1)
 * ============================================================================
 */

/**
 * 📡 ระบบส่งสัญญาณชีพหลัก (System Telemetry Status Enums)
 * แปลงข้อความคุยหน้างานให้กลายเป็นรหัสวิศวกรรมข้อมูลดิจิทัลดิบเชิงลึก
 */
export enum TelemetryStatus {
  LOW_CONFIDENCE = "Low confidence",         // ชุดข้อมูลนำเข้า (Input Data) ไม่เพียงพอต่อการตัดสินใจ
  ESCALATION_REQUEST = "Escalation request", // สั่งตัดระบบอัตโนมัติเพื่อให้มนุษย์เข้ามาตรวจสอบหน้างานทันที
  CONTEXT_MISMATCH = "Context mismatch",     // ข้อมูลนำเข้าขัดแย้งกับบริบทหลักหรือสัญญาณเซนเซอร์จริง
  REPEATED_FAILURE = "Repeated failure",     // กระบวนการทำงาน (Workflow) ติดลูปล้มเหลวซ้ำซาก ณ พิกัดเดิม
  UNCERTAINTY_SPIKE = "Uncertainty spike",   // แบบจำลองคณิตศาสตร์วิเคราะห์มีความผันผวนสูง ดัชนีความแน่นอนดิ่งต่ำ
  AGENT_CONFLICT = "Agent conflict"          // ตรรกะการให้เหตุผลระหว่างเอเจนต์ย่อยสองตัวเกิดการขัดแย้งกันเอง
}

/**
 * 💡 อินเตอร์เฟซรายงานข้อจำกัดตนเอง (AI Reflection Interface)
 * ชุดข้อความข้อผิดพลาดมาตรฐาน (Standardized Error Tokens) เมื่อโมเดลชนเพดานขีดจำกัด
 */
export enum SelfReportingToken {
  MORE_DATA_REQUIRED = "More Data Required",
  SENSOR_UNRELIABLE = "Sensor Unreliable",
  CONFIDENCE_BELOW_THRESHOLD = "Confidence Below Threshold",
  CONFLICTING_INPUTS_DETECTED = "Conflicting Inputs Detected",
  POLICY_AMBIGUITY = "Policy Ambiguity / Edge Case Detected"
}

/**
 * 🧩 รายชื่อเอเจนต์เฉพาะทาง (Specialized AI Agents)
 * ตามโครงข่ายปิดที่ระบุไว้ในธรรมนูญสถาปัตยกรรมองค์กร
 */
export type SpecializedAgentName =
  | 'Inventory_AI'   // คุม Stock, Forecasting
  | 'QC_AI'          // คุม Defect, Image Analysis
  | 'Workforce_AI'   // คุม วิเคราะห์รูปแบบพฤติกรรมคนทำงาน
  | 'Finance_AI'     // คุม Cost/Risk Analysis
  | 'Risk_AI'        // คุม Anomaly Detection
  | 'Logistics_AI'   // คุม Routing, SLA
  | 'Campaign_AI'    // คุม Promotion Optimization
  | 'Guardian_AI';   // สอดส่องเฝ้าดูพฤติกรรมและความเสี่ยงของ AI ตัวอื่น

/**
 * 📊 วัตถุโครงสร้างสตรีมสัญญาณชีพ (Telemetry Data Stream Object)
 * ใช้สำหรับตรวจสอบความถูกต้อง (Asset Mapping Validation) ใน Pipeline
 */
export interface AgentSignal {
  agentName: SpecializedAgentName;
  timestamp: string;
  status: TelemetryStatus | SelfReportingToken;
  confidenceScore: number;            // ค่าน้ำหนักความแม่นยำระหว่าง 0.00 ถึง 1.00
  reasoningLog: string;               // บันทึกตรรกะการให้เหตุผล (Reasoning Logs) ของโมเดล
  isAnthropomorphicDetected: boolean; // 🔒 ตรวจจับการพ่นข้อความแสดงอารมณ์/จิตสำนึกลวง (Hallucination Isolation)
}
