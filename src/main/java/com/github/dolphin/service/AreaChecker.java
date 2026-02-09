package com.github.dolphin.service;

import java.math.BigDecimal;
import java.math.MathContext;

public class AreaChecker {

    private static final MathContext MC = new MathContext(400);
    private static final BigDecimal ZERO = BigDecimal.ZERO;

    public static boolean isHit(BigDecimal x, BigDecimal y, BigDecimal r) {
        if (r.compareTo(ZERO) < 0) {
            x = x.negate();
            y = y.negate();
            r = r.abs();
        }
        return inRectangle(x, y, r) || inQuarterCircle(x, y, r) || inTriangle(x, y, r);
    }

    private static boolean inRectangle(BigDecimal x, BigDecimal y, BigDecimal r) {
        return x.compareTo(r.negate()) >= 0
                && x.compareTo(ZERO) <= 0
                && y.compareTo(ZERO) >= 0
                && y.compareTo(r) <= 0;
    }

    private static boolean inQuarterCircle(BigDecimal x, BigDecimal y, BigDecimal r) {
        if (x.compareTo(ZERO) < 0 || y.compareTo(ZERO) > 0) return false;
        BigDecimal sum = x.pow(2, MC).add(y.pow(2, MC), MC);
        BigDecimal radiusSquared = r.pow(2, MC);
        return sum.compareTo(radiusSquared) <= 0;
    }

    private static boolean inTriangle(BigDecimal x, BigDecimal y, BigDecimal r) {
        return x.compareTo(ZERO) <= 0
                && y.compareTo(ZERO) <= 0
                && x.add(y).compareTo(r.negate()) >= 0;
    }
}
