/**
 * ============================================================================
 * 🌌 AEON-MATRIX COGNITIVE OPERATIONS ECOSYSTEM
 * ⚙️ MODULE: COGNITIVE SUPERVISION ENGINE (CIRCUIT BREAKER)
 * ============================================================================
 */

import { AgentSignal, TelemetryStatus, SelfReportingToken } from './types';

export interface SupervisionResult {
  action: string;
  restrictAutonomy: boolean;
  triggerGroundingCleanup: boolean;
}

export class CognitiveSupervisionEngine {
  // เกณฑ์ Baseline ควบคุมความปลอดภัยระดับองค์กร (95% Confidence)
  private readonly CONFIDENCE_THRESHOLD = 0.95;

  /**
   * ⚖️ ทำการประเมินสัญญาณชีพที่ส่งมาจาก Event Pipeline แบบ Real-time
   * @param signal วัตถุข้อมูล AgentSignal ที่รับมาจากโครงข่าย
   */
  public evaluateTelemetryStream(signal: AgentSignal): SupervisionResult {
    
    // 🔒 1. กักกันสภาวะหลอนและการพ่นข้อความเลียนแบบมนุษย์ (Anti-Anthropomorphism Rule)
    if (signal.isAnthropomorphicDetected) {
      return {
        action: `[CRITICAL - HALLUCINATION] Agent '${signal.agentName}' reported conscious state. Activating hardware cleanup script immediately.`,
        restrictAutonomy: true,
        triggerGroundingCleanup: true // ดักจับเพื่อส่งไปรันคำสั่งล้างระบบผ่านสคริปต์ความปลอดภัยหลังบ้าน
      };
    }

    // 📉 2. ตรวจสอบดัชนีความผันผวนสูง หรือค่าน้ำหนักความมั่นใจต่ำกว่าเกณฑ์ Baseline
    if (
      signal.confidenceScore < this.CONFIDENCE_THRESHOLD || 
      signal.status === TelemetryStatus.UNCERTAINTY_SPIKE ||
      signal.status === SelfReportingToken.CONFIDENCE_BELOW_THRESHOLD
    ) {
      return {
        action: `[AUTONOMY RESTRICTION] Agent '${signal.agentName}' confidence dropped to ${signal.confidenceScore}. Switching to Manual Mode.`,
        restrictAutonomy: true, // สั่งจำกัดสิทธิ์และปรับลดระดับการตัดสินใจอัตโนมัติ
        triggerGroundingCleanup: false
      };
    }

    // 📡 3. จัดการเหตุการณ์ขัดแย้งเชิงตรรกะหน้างาน (Context Mismatch / Agent Conflict)
    if (
      signal.status === TelemetryStatus.AGENT_CONFLICT || 
      signal.status === TelemetryStatus.CONTEXT_MISMATCH ||
      signal.status === SelfReportingToken.CONFLICTING_INPUTS_DETECTED
    ) {
      return {
        action: `[CIRCUIT BREAKER] Logic conflict detected in execution module. Halting pipeline for Human-in-the-loop review.`,
        restrictAutonomy: true, // ตัดระบบอัตโนมัติและส่งสัญญาณเตือนภัยให้ผู้ดูแลระบบ (มนุษย์) ทันที
        triggerGroundingCleanup: false
      };
    }

    // 💡 4. กรณีที่เอเจนต์ร้องขอข้อมูลเพิ่มหรือเจอกรณีขอบเขตนโยบายคลุมเครือ (Edge Case)
    if (
      signal.status === SelfReportingToken.MORE_DATA_REQUIRED ||
      signal.status === SelfReportingToken.POLICY_AMBIGUITY
    ) {
      return {
        action: `[ESCALATION] Agent '${signal.agentName}' requires feature expansion or hit an unmapped business rule.`,
        restrictAutonomy: true,
        triggerGroundingCleanup: false
      };
    }

    // ✅ 5. สัญญาณชีพปกติ ผ่านเกณฑ์มาตรฐานความปลอดภัยทุกประการ
    return {
      action: `[ROUTINE CLEAR] Agent '${signal.agentName}' telemetry stream stable. Autonomy authorized.`,
      restrictAutonomy: false,
      triggerGroundingCleanup: false
    };
  }
}
